from app.classes.response import Response
from app.forms import CategoryForm
from app.models import Category
from django.contrib.auth.mixins import UserPassesTestMixin
from django.http import JsonResponse
from django.views.generic import ListView

from ..classes.response import ResponseStatus


class CategoryView(UserPassesTestMixin, ListView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.response = Response()

    def test_func(self):
        return self.request.user.is_superuser

    def get(self, request, *args, **kwargs):
        self.response.data.result.update(Category.objects.all())
        return JsonResponse(self.response.as_dict(), safe=False)

    def post(self, request, *args, **kwargs):
        form = CategoryForm(request.POST.get('category'))

        if form.is_valid():
            request_category = form.cleaned_data
            category_name = request_category.get('name')
            long_description = request_category.get('long_description')

            if request_category.id is not None:
                category = Category.objects.filter(id=request_category.id)[0]

                if category:
                    category.name = category_name
                    category.long_description = long_description
                    self.response.status(ResponseStatus.SUCCESS)
                    category.save()
            else:
                category = Category(name=category_name, long_description=long_description)
                category.parent_category = Category.objects.filter(id=request_category.parent_category.id)[0]

                if category.parent_category:
                    category.save()
                    self.response.status(ResponseStatus.SUCCESS)
        else:
            self.response.errors.append('Invalid data')
        return JsonResponse(self.response.as_dict(), safe=False)
