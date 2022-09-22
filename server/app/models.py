from django.contrib.auth import get_user_model
from django.db import models


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    long_description = models.TextField(max_length=100)
    parent_category = models.ForeignKey("self", on_delete=models.CASCADE)
    objects = models.Manager()


class Carousel(models.Model):
    objects = models.Manager()
    image = models.FileField(upload_to="app/static/images")
    type = models.TextField("Type of page")
    url = models.CharField(max_length=40, default="")


class Product(models.Model):
    objects = models.Manager()
    title = models.CharField(max_length=30)
    price = models.IntegerField()
    short_description = models.CharField("Excerpt", max_length=200, help_text="Excerpt")
    count = models.IntegerField(default=20)
    image = models.FileField(upload_to="app/static/images")  # Main image
    long_description = models.TextField("Description", max_length=600, blank=True, help_text="Description")
    brand = models.CharField(max_length=20, blank=True)
    status = models.CharField(choices=[("limited", "limited"), ("unlimited", "unlimited")], default="unlimited",
                              max_length=9)
    rating = models.IntegerField(default=5, choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)])
    characterictics = models.TextField("Characteristics", max_length=300, blank=True,
                                       help_text="Используйте форму записи name:value;")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class ProductImages(models.Model):
    ex_photo = models.FileField(help_text="Additional image", upload_to="app/static/images")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    count = models.IntegerField(default=1)
    status = models.IntegerField(choices=[(1, "Куплено"), (0, "Не куплено")], default=0)

    def __str__(self):
        return self.product.__str__()


class Comment(models.Model):
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    date = models.DateField()
    message = models.CharField(max_length=300)
    post = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5, choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)])


class Favorite(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Avatar(models.Model):
    photo = models.FileField(upload_to="app/static/avatars", max_length=50 * 10)
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return "Photo"


class UserData(models.Model):
    objects = models.Manager()
    status = models.CharField(choices=[("admin", "Admin"), ("user", "User")], default="user", max_length=40)
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return self.status


class Letter(models.Model):
    email = models.CharField(max_length=30)
    message = models.TextField(max_length=300)
    date = models.DateField()
    cause = models.CharField(max_length=50, default="Unspecified")

    def __str__(self):
        return self.email

# python manage.py makemigrations
# python manage.py migrate
