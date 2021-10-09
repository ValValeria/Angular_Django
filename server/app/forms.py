from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.forms import ModelForm
from .models import Product
from django.core.exceptions import ValidationError
import json
import os

class CarouselImagesForm(forms.Form):
    home = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
    products = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
    product = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
    urls_list = forms.FileField()

    def clean(self):
        cleaned_data = super().clean()
        images = [cleaned_data.get(type) for type in ['home', 'products', 'product']]
        
        for image in images:
            allowed_ext = ('.png', '.jpeg', '.svg', '.jpg')
            filename, ext = os.path.splitext(image.name)

            if not ext in allowed_ext:
                raise ValidationError( "Invalid extension of file ", "Error")

    def clean_urls_list(self):
       file = self.cleaned_data['urls_list']

       try:
           urls = json.load(file)

           if not isinstance(urls, list):
               raise TypeError()
       except TypeError:
           raise ValidationError(_('Only arrays is allowed'), code='invalid type')
       except:
           raise ValidationError(_('Invalid json value'), code='invalid value')
             


class ValidateImages(forms.Form):
    images = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))

    def clean_images(self):
        images = self.images

        for image in images:
            if "image/" not in image.content_type:
                raise ValidationError("Invalid type of file", code="invalid")


class ValidateUserForm(ModelForm):
    class Meta:
        model = User
        fields = [
            'username', 'password', 'email'
        ];


class CreateProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['title', 'price', 'short_description',
                  'count', 'long_description',
                  'brand', 'category', 'status', 'rating',
                  'characterictics'
                  ]


class AuthenticateForm(forms.Form):
    email = forms.EmailField(max_length=30, min_length=10, required=False)
    password = forms.CharField(max_length=30, min_length=10)
    username = forms.CharField(max_length=30, min_length=10)

    def __init__(self, form, isLogin=False):
        self.isLogin = isLogin
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
