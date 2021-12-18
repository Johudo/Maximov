from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.models import Order
from products.models import Product, ProductType
from products.serializers.common import (
    ProductTypeListSerializer,
    ProductListSerializer,
    ProductDetailSerializer,
    OrderCreateSerializer,
    OrderListSerializer,
)


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


class OrderCreateView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Order.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return OrderListSerializer

        return OrderCreateSerializer

    def get_queryset(self, *args, **kwargs):
        if self.request.method in ["GET"]:
            return super().get_queryset(*args, **kwargs).filter(user=self.request.user)

        return super().get_queryset(*args, **kwargs)
