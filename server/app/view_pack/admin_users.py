from django.views.generic import ListView
from django.core.paginator import Paginator
from django.http import *
from django.contrib.auth.models import User
from ..classes.UserParser import UserParser


class AdminUsers(ListView):
    response = {"data": {"users": []}, "errors": [], "status": ""}

    def get(self, request, *args, **kw):
        page = request.GET.get("page")
        per_page = request.GET.get("per_page")

        if not request.user.is_superuser or not page.isdigit() or not per_page.isdigit():
            return HttpResponseForbidden()
        else:
            page = int(page)
            per_page = int(per_page)

            users = User.objects.exclude(id__exact=request.user.id).order_by("id")
            paginator = Paginator(users, per_page)
            page_obj = paginator.page(page)

            users = [UserParser(user).get_user() for user in page_obj.object_list]

            self.response["data"]["users"] = users
            self.response["data"]["has_next"] = page_obj.has_next()
            self.response["data"]["has_prev"] = page_obj.has_previous()
            self.response["data"]["all_pages"] = paginator.num_pages
            self.response["data"]["all_users_count"] = len(users)

            return JsonResponse(self.response)


class AdminDeleteUsers(ListView):
    response = {"data": {"users": []}, "errors": [], "status": ""}

    def get(self, request, number):
        auth_user = request.user

        if number and number > 0:
            user = User.objects.all().filter(id=number).exclude(id=auth_user.id)[0]

            if user and auth_user.is_superuser:
                user.delete()
                self.response["status"] = "ok"

                return JsonResponse(self.response)
            else:
                return HttpResponseForbidden()

        return HttpResponseBadRequest()


class AdminViewUser(ListView):
    response = {"data": {"user": None}, "errors": [], "status": ""}

    def get(self, request, number):
        user = User.objects.filter(id__exact=int(number))[0]

        if not user:
            self.response["errors"].append("The user with such id doesn't exist in our database")
            self.response["status"] = "error"
        else:
            if user.id == request.user.id or request.user.is_superuser:
                self.response["data"]["user"] = UserParser(user).get_user()
            else:
                return HttpResponseForbidden

        return JsonResponse(self.response)


class AdminCreateUser(ListView):
    response = {"data": {"user": None}, "errors": [], "status": ""}

    def post(self, request, *args, **kw):
        pass
