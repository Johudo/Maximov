from rest_framework import serializers
from products.serializers.nested import (
    ProductСharacteristicNestedSerializer,
)
from products.models import ProductType, Product


class ProductTypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ("id", "name")
        depth = 1


class ProductListSerializer(serializers.ModelSerializer):
    characteristics = ProductСharacteristicNestedSerializer(
        many=True, source="product_characteristic"
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "сreation_year",
            "price",
            "name",
            "type",
            "provider",
            "country",
            "image",
            "characteristics",
        ]
        depth = 1


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "сreation_year",
            "price",
            "name",
            "type",
            "provider",
            "country",
            "image",
        )
        depth = 1
