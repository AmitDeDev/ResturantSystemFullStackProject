from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Dish, Orders
from .serializers import CategorySerializer, DishSerializer, OrdersSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.http.response import JsonResponse

# Create your views here.


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_fields = ['name', 'dish']
    search_fields = ['^name']
    ordering_fields = ['id', 'name', 'dish']


class DishView(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['name', 'category', 'id']
    search_fields = ['^name']
    ordering_fields = ['id', 'name', 'category', 'price']


class OrdersView(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['first_name', 'last_name', 'address']
    search_fields = ['^first_name', 'last_name', 'dish']
    ordering_fields = ['id', 'first_name', 'last_name']
