from django.http import HttpResponseForbidden, HttpResponseBadRequest
from django.views.generic import ListView
from ..models import Carousel
from ..forms import CarouselImagesForm


class CarouselView(ListView):
    allowed_types = frozenset(('product', 'home', 'products'))

    def post(self, request, *args, **kw):
        pageType = kw.get('type')

        if pageType not in self.allowed_types:
            return HttpResponseBadRequest()

        images = request.FILES.getlist('images')
        form = CarouselImagesForm(request.POST, request.FILES)

        if form.is_valid():
            pass
        else:
            return HttpResponseForbidden()
