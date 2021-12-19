from django.db.models import Max, Min
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters import rest_framework as filters
from users.models import Order
from products.models import Product, ProductType, Storage, Provider
from products.filters import ProductListFilter
from products.serializers.common import (
    ProductTypeListSerializer,
    ProductListSerializer,
    ProductDetailSerializer,
    OrderCreateSerializer,
    OrderListSerializer,
    StorageListSerializer,
    ProviderListSerializer,
)


class ProductTypeListView(generics.ListAPIView):
    serializer_class = ProductTypeListSerializer
    queryset = ProductType.objects.all()
    permission_classes = (AllowAny,)


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    queryset = Product.objects.all()
    permission_classes = (AllowAny,)
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductListFilter

    def list(self, request):
        qs = super().get_queryset()
        qs = self.filterset_class(self.request.GET, queryset=qs).qs

        serialize_value = self.serializer_class(
            qs, many=True, context={"request": request}
        ).data

        max_price = Product.objects.aggregate(Max("price"))["price__max"]
        min_price = Product.objects.aggregate(Min("price"))["price__min"]
        return_val = {
            "products": serialize_value,
            "price_range": {"max": max_price, "min": min_price},
        }
        return Response(
            return_val, status=status.HTTP_200_OK, content_type="application/json"
        )


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


class StorageListView(generics.ListAPIView):
    serializer_class = StorageListSerializer
    queryset = Storage.objects.all()
    permission_classes = (AllowAny,)


class ProviderListView(generics.ListAPIView):
    serializer_class = ProviderListSerializer
    queryset = Provider.objects.all()
    permission_classes = (AllowAny,)
