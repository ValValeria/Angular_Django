from django.http import HttpResponseForbidden, HttpResponseBadRequest, JsonResponse, HttpResponseNotFound
from django.views.generic import ListView
from ..models import Carousel
from ..forms import CarouselImagesForm
import os
import json

class CarouselView(ListView):
    allowed_types = list(('product', 'home', 'products'))
    response = {'data': {"images": [], "pageType": ""}, 'type': '', 'errors': []}

    def get(self, request, *args, **kw):
        pageType = kw.get('type')
        self.response['type'] = pageType
        self.response['data']['images'].clear()

        if pageType not in self.allowed_types:
            return HttpResponseBadRequest()
        else:
            self.response['data']['pageType'] = pageType

        for image in Carousel.objects.filter(type__exact=pageType):
            obj = {'postUrl': image.url,
                   'id': image.id,
                   'file': image.image.url,
                   'type': image.type
                   }
            self.response['data']['images'].append(obj)

        return JsonResponse(self.response)


class CarouselDeleteView(ListView):
    response = {'data': {"deleted_ids": []}, 'errors': [], 'status': ''}

    def get(self, request, carousel_id):
        carousel = Carousel.objects.filter(id=int(carousel_id)).first()

        if not request.user.is_superuser:
            return HttpResponseForbidden()

        if not carousel:
            return HttpResponseNotFound()

        base_path = os.path.realpath("./app/static/images/")
        filename = os.path.normpath(os.path.join(base_path, carousel.image.name))

        if os.path.exists(filename):
           os.remove(filename)
        
        Carousel.objects.get(id=int(carousel_id)).delete()
        self.response['status'] = 'ok'

        return JsonResponse(self.response)


class CarouselDownloadView(ListView):
    allowed_types = list(('product', 'home', 'products'))
    response = {'data': [], 'type': '', 'errors': [], 'status': ''}

    def post(self, request, *args, **kw):
        form = CarouselImagesForm(request.POST, request.FILES)
        carousel_type = kw['type']

        if not request.user.is_superuser or not self.allowed_types.count(carousel_type):
            return HttpResponseForbidden()  

        if form.is_valid():
            imagesList = request.FILES.getlist(carousel_type)
            file_data = form.cleaned_data['urls_list']
            urls = json.load(file_data)

            for index, image in enumerate(imagesList):
                filename = carousel_type + image.name
               
                carousel = Carousel()
                carousel.url = urls[index] if urls[index] else ""
                carousel.image = image
                carousel.image.name = filename
                carousel.type = carousel_type
                carousel.save()

                base_path = os.path.realpath("./app/static/images/")
                filename = os.path.normpath(os.path.join(base_path, image.name))
                prev_file = os.path.normpath(os.path.join(base_path, image.name))

                if os.path.exists(prev_file):
                   os.remove(prev_file)

                with open(filename, 'wb+') as destination:
                     for chunk in image.chunks():
                         destination.write(chunk)

                     self.response['status'] = 'ok'
                     print("File is uploaded. Filename is " + filename)
        else:
            self.response['errors'].append(form.errors.as_json())

        return JsonResponse(self.response)
