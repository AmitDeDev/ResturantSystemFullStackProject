from rest_framework import serializers
from .models import Category, Dish, Orders


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(
            instance.category
        ).data
        return data


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['dish'] = DishSerializer(
            instance.dishes, many=True
        ).data
        return data
