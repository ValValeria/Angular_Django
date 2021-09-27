from django.http import HttpResponseForbidden, HttpResponseBadRequest, JsonResponse
from django.views.generic import ListView
from ..models import Carousel
from ..forms import CarouselImagesForm


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


class CarouselDownloadView(ListView):
    allowed_types = list(('product', 'home', 'products'))
    response = {'data': [], 'type': '', 'errors': []}

    def post(self, request, *args, **kw):
        form = CarouselImagesForm(request.POST, request.FILES)

        if form.is_valid:
            imagesList = [request.FILES.getlist(val) for val in self.allowed_types]

            for index, images in enumerate(imagesList):
                for image in images:
                    carousel = Carousel()
                    carousel.image = image
                    carousel.type = self.allowed_types[index]
                    carousel.save()
        else:
            self.response['error'].extend(form.errors.as_json())
