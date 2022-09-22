import re

from django.db.models import Q
from django.http.response import JsonResponse
from django.views.generic import View

from ..classes.response import Response
from ..models import Product


class Search(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.response = Response()

    def get(self, request, *args, **kw):
        search = request.GET.get("search")
        result = re.match("[a-z]{2,10}", search)

        if result:
            products = list(Product.objects.filter(Q(title__icontains=search) | Q(category__contains=search) | Q(
                short_description__contains=search)).distinct().values())

            if len(products):
                self.response.data.result.update(products)
        else:
            self.response.errors.append("Invalid search word")
        return JsonResponse(self.response, json_dumps_params={'ensure_ascii': False})
