from django.views.generic import ListView

from server.app.classes.response import Response
from server.app.models import CategoryModel


class CategoryView(ListView):
    response = Response()

    def get(self, request, *args, **kwargs):
        self.response.data.data.update(CategoryModel.objects.all())
        return super().get(request, *args, **kwargs)
