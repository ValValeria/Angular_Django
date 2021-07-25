from django.http import HttpResponseBadRequest, JsonResponse
from django.views.generic import ListView
from ..models import Product


class CategoriesView(ListView):
    response = {"errors": [], "data": {"categories": []}, "status": ""}

    def get(self, request, *args, **kwargs):
        search = request.GET.get('search')
        result = []

        if not search or len(search) > 20:
            return HttpResponseBadRequest()

        categories = Product.objects.filter(category__icontains=search).values('category')

        for obj in list(categories):
            if not result.count(obj['category']):
                result.append(obj['category'])

        self.response['data']['categories'] = result

        return JsonResponse(self.response)
