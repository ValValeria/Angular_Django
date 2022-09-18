import os
import os.path as path

from django.http import JsonResponse, HttpResponseForbidden, HttpResponseNotFound
from django.views.generic import View

from ..classes.response import Response, ResponseStatus
from ..forms import CreateProductForm
from ..models import Product


class UpdateProductView(View):
    response: Response

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.response = Response()

    def post(self, request, *args, **kw):
        if not request.user.is_superuser:
            return HttpResponseForbidden()

        form = CreateProductForm(request.POST, request.FILES)
        image = request.FILES.get('image')
        product = Product.objects.filter(id=request.POST.get('id')).first()

        if not product:
            return HttpResponseNotFound()

        if form.is_valid():
            if image and hasattr(image, 'content_type'):
                base_path = path.realpath("./app/static/images/")
                filename = os.path.normpath(path.join(base_path, image.name))
                prev_file = os.path.normpath(path.join(base_path, product.image.name))

                if os.path.exists(prev_file):
                    os.remove(prev_file)

                with open(filename, 'wb+') as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)

                    print("File is uploaded. Filename is " + filename)

                for k, v in form.cleaned_data.items():
                    if hasattr(product, k):
                        setattr(product, k, v)

                product.image = '/app/static/images/' + image.name
                product.save()
                self.response.status(ResponseStatus.SUCCESS)
            else:
                self.response.errors.append('Invalid extension of image')
        else:
            self.response.errors.append(form.errors)
        return JsonResponse(self.response)


class AddProductView(View):
    response = Response()

    def post(self, request, *args, **kw):
        if not request.user.is_superuser:
            return HttpResponseForbidden()
        form = CreateProductForm(request.POST, request.FILES)
        image = request.FILES.get('image')
        if form.is_valid():
            if image and hasattr(image, 'content_type'):
                base_path = path.realpath("./app/static/images/")
                filename = path.join(base_path, image.name)
                product = Product()

                with open(filename, 'wb+') as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)

                for k, v in form.cleaned_data.items():
                    if hasattr(product, k):
                        setattr(product, k, v)

                product.image = '/app/static/images/' + image.name
                product.user = request.user
                product.save()

                self.response.status(ResponseStatus.SUCCESS)
                self.response.info.additional_info.update({"id": product.id})
            else:
                self.response.errors.append('Invalid extension of image')
        else:
            self.response.errors.append(form.errors)
        return JsonResponse(self.response)
