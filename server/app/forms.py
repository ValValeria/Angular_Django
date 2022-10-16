import os

from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.forms import ModelForm

from .models import Product, Category


class CarouselImagesForm(forms.Form):
    home = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}), required=False)
    products = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}), required=False)
    product = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}), required=False)
    urls_list = forms.FileField()

    def clean(self):
        cleaned_data = super().clean()
        images = [cleaned_data.get(type) for type in ['home', 'products', 'product'] if type in cleaned_data.keys()]

        for image in images:
            allowed_ext = ('.png', '.jpeg', '.svg', '.jpg')
            filename, ext = os.path.splitext(image.name)

            if not ext in allowed_ext:
                raise ValidationError("Invalid extension of file ", "Error")

        return cleaned_data


class ValidateImages(forms.Form):
    images = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))


class ValidateUserForm(ModelForm):
    class Meta:
        model = User
        fields = [
            'username', 'password', 'email'
        ]


class CreateProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['title', 'price', 'short_description',
                  'count', 'long_description',
                  'brand', 'status', 'rating',
                  'characterictics']


class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'long_description', 'parent_category']


class AuthenticateForm(forms.Form):
    email = forms.EmailField(max_length=30, min_length=10, required=False)
    password = forms.CharField(max_length=30, min_length=10)
    username = forms.CharField(max_length=30, min_length=10)

    def __init__(self, form, is_login: bool = False):
        self.isLogin = is_login
        super().__init__(form)

    def clean_email(self):
        email = self.cleaned_data['email']

        if not self.isLogin:
            raise ValidationError("Invalid email")

        return email


class CommentForm(forms.Form):
    rating = forms.IntegerField()
    message = forms.CharField(max_length=300)
    post_id = forms.IntegerField()


class LetterForm(forms.Form):
    email = forms.EmailField(max_length=30, min_length=10)
    message = forms.CharField(max_length=300, min_length=10)
    cause = forms.CharField(max_length=50)


class MenuForm(forms.Form):
    name = forms.CharField(max_length=50)
    link = forms.CharField(max_length=250)
