from django.http import HttpResponseForbidden, HttpResponseBadRequest, JsonResponse
from django.views.generic import ListView
from ..models import Carousel
from ..forms import CarouselImagesForm
import os

class CarouselView(ListView):
    allowed_types = list(('product', 'home', 'products'))
    response = {'data': {"images": []}, 'type': '', 'errors': []}

    def get(self, request, *args, **kw):
        pageType = kw.get('type')
        self.response['type'] = pageType

        if pageType not in self.allowed_types:
            return HttpResponseBadRequest()

        images = [image.image.url for image in Carousel.objects.filter(type=pageType)]
        self.response['data']['images'].extend(images)

        return JsonResponse(self.response)


class CarouselDeleteView(ListView):
    response = {'data': {"deleted_ids": []}, 'errors': [], 'status': ''}

    def get(self, request, *args, **kw):
        filename = request.GET.get('filename')
        file_type = request.GET.get('type')

        if not request.user.is_superuser:
            return HttpResponseForbidden()

        if not filename or not file_type:
            return HttpResponseBadRequest()

        images = Carousel.objects.filter(type=file_type)

        for image in images:
            self.response['data']['deleted_ids'].append(image.id)

            base_path = path.realpath("./app/static/images/")
            filename = os.path.normpath(path.join(base_path, image.image.name))

            if os.path.exists(filename):
               os.remove(filename)

            image.delete()

        return JsonResponse(self.response)


class CarouselDownloadView(ListView):
    allowed_types = list(('product', 'home', 'products'))
    response = {'data': [], 'type': '', 'errors': [], 'status': ''}

    def post(self, request, *args, **kw):
        form = CarouselImagesForm(request.POST, request.FILES)

        if not request.user.is_superuser:
            return HttpResponseForbidden()  

        if form.is_valid:
            imagesList = [request.FILES.getlist(val) for val in self.allowed_types]
            self.response['status'] = 'ok'

            for index, images in enumerate(imagesList):
                for image in images:
                    image_type = self.allowed_types[index]
                    filename = image_type + image.name

                    carousel = Carousel()
                    carousel.image = image
                    carousel.image.name = filename
                    carousel.type = image_type
                    carousel.save()

                    base_path = path.realpath("./app/static/images/")
                    filename = os.path.normpath(path.join(base_path, image.name))
                    prev_file = os.path.normpath(path.join(base_path, image.name))

                    if os.path.exists(prev_file):
                       os.remove(prev_file)

                    with open(filename, 'wb+') as destination:
                       for chunk in image.chunks():
                          destination.write(chunk)

                       print("File is uploaded. Filename is " + filename)
        else:
            self.response['error'].extend(form.errors.as_json())

        return JsonResponse(self.response)
