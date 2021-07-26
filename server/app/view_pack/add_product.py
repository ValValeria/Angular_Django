import os
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseNotFound
from django.shortcuts import get_object_or_404
from django.views.generic import View
from ..forms import CreateProductForm, ValidateImages
from ..models import ProductImages, Product
import os.path as path
import time


class UpdateProductView(View):
    response = {"errors": [], "data": {"url": ""}, "status": ""}

    def post(self, request, *args, **kw):
        if not request.user.is_superuser:
            return HttpResponseForbidden()

        form = CreateProductForm(request.POST, request.FILES)
        image = request.FILES.get('image')
        product = Product.objects.filter(id=request.POST.get('id')).first()

        if not product:
            return HttpResponseNotFound()

        if form.is_valid():
            if image:
                base_path = path.realpath("./")
                filename = os.path.normpath(path.join(base_path, image.name))
                prev_file = os.path.normpath(path.join(base_path, product.image.name))

                os.remove(prev_file)

                with open(filename, 'wb+') as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)

                for k, v in form.cleaned_data.items():
                    setattr(product, k, v)

                product.image = '/public/images/' + image.name
                product.user = request.user
                product.save()

                self.response['status'] = 'ok'
            else:
                self.response['errors'].append('Invalid extension of image')
        else:
            self.response['errors'].append(form.errors)

        return JsonResponse(self.response)


class AddProductView(View):
    response = {"errors": [], "data": {"url": ""}, "status": ""}

    def post(self, request, *args, **kw):
        if not request.user.is_superuser:
            return HttpResponseForbidden()

        form = CreateProductForm(request.POST, request.FILES)
        image = request.FILES.get('image')

        if form.is_valid():
            if image and image.content_type.startswith('image/'):
                base_path = path.realpath("./app/static/images/")
                filename = path.join(base_path, image.name)

                with open(filename, 'wb+') as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)

                product = Product()

                for k, v in form.cleaned_data.items():
                    setattr(product, k, v)

                product.image = '/public/images/' + image.name
                product.user = request.user
                product.save()

                self.response['status'] = 'ok'
                self.response['data']['id'] = product.id
            else:
                self.response['errors'].append('Invalid extension of image')
        else:
            self.response['errors'].append(form.errors)

        return JsonResponse(self.response)
