from django.db import models


# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=200)
    imageUrl = models.CharField(max_length=2000)

    def __str__(self):
        return self.name


class Dish(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    description = models.TextField()
    imageUrl = models.CharField(max_length=2000)
    isGlutenFree = models.BooleanField(default=False)
    isVegeterian = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Orders(models.Model):
    dishes = models.ManyToManyField(Dish)
    time = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)

    def __str__(self):
        return self.first_name
