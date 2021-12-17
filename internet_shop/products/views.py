from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny

from products.models import Product, ProductType
from products.serializers.common import (
    ProductTypeListSerializer,
    ProductListSerializer,
    ProductDetailSerializer,
)

# Create your views here.


class ProductTypeListView(generics.ListAPIView):
    serializer_class = ProductTypeListSerializer
    queryset = ProductType.objects.all()
    permission_classes = (AllowAny,)


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    queryset = Product.objects.all()
    permission_classes = (AllowAny,)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()
    permission_classes = (AllowAny,)
