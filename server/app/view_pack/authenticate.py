from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.core.files import File
from django.db.models import Q
from django.http import JsonResponse
from django.views import View
from ..classes.UserParser import UserParser
from ..forms import AuthenticateForm
from ..models import Avatar, UserData
from django.contrib.auth.hashers import make_password


class LoginView(View):
    response = {"data": {"user": {}}, "status": ""}
    form = AuthenticateForm

    def post(self, *args, **kwargs):
        form = self.form(self.request.POST, True)

        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])

            if user is not None:
                login(self.request, user)

                if user.is_superuser:
                    user.role = 'admin'

                self.response["data"]["user"] = UserParser(user).get_user()
                self.response["status"] = "user"
            else:
                self.response["status"] = "guest"
        else:
            self.response['errors'] = form.errors

        return JsonResponse(self.response)


class SignUpView(View):
    form = AuthenticateForm
    response = {"errors": [], "messages": [], "data": {}}

    def post(self, request, *args, **kwargs):
        form = self.form(request.POST, True)

        if request.user.is_authenticated:
            self.response['status'] = 'user'
        elif form.is_valid():
            user = User.objects.filter(Q(username=form.cleaned_data['username']) | Q(
                email=form.cleaned_data["email"])).first()

            if not user:
                f = open(r"./app/static/avatars/blank.jpg", 'rb')
                file = File(f)
                user = User.objects.create_user(
                    username=form.cleaned_data["username"], email=form.cleaned_data["email"],
                    password=form.cleaned_data["password"])
                user.avatar = Avatar(user=user)
                user.avatar.photo.save("blank.jpg", file, save=False)
                user_data = UserData.objects.create(status="admin", user=user)
                user.userdata = user_data
                user.save()

                self.response["data"].update(
                    {"user": UserParser(user).get_user()})
                self.response['status'] = "user"
            else:
                self.response["errors"].append(
                    "Пользователь с такой почтой или именем уже есть")
        else:
            self.response['errors'] = list(form.errors)

        return JsonResponse(self.response)
