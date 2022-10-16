from typing import Optional

from django.contrib.auth.mixins import UserPassesTestMixin
from django.http import JsonResponse
from django.views.generic import FormView, ListView

from ..classes.response import Response, ResponseStatus
from ..forms import MenuForm
from ..models import MenuItems


class MenuItemsView(ListView):
    response: Optional[Response]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.response = Response()

    def get(self, request, *args, **kwargs):
        menu = list(MenuItems.objects.all().values())
        self.response.data.result.update({"menu": menu})
        self.response.status(ResponseStatus.SUCCESS)
        return JsonResponse(self.response, safe=False)


class Menu(FormView, UserPassesTestMixin):
    response: Optional[Response]
    form_class = MenuForm

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.response = Response()

    def test_func(self):
        return self.request.user.is_superuser

    def form_valid(self, form):
        data = form.cleaned_data
        menu_item = MenuItems()
        menu_item.name = data.get("name")
        menu_item.link = data.get("link")
        menu_item.save()
        self.response.status(ResponseStatus.SUCCESS)
        return JsonResponse(self.response, safe=False)

    def form_invalid(self, form):
        self.response.errors.extend(form.errors.values())
        self.response.status(ResponseStatus.ERROR)
        return JsonResponse(self.response, safe=False)
