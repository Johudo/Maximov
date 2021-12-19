from rest_framework import serializers
from products.serializers.nested import (
    ProductСharacteristicNestedSerializer,
    OrderProductsCreateNestedSerializer,
    OrderProductsListNestedSerializer,
    ProductStorageCountNestedSerializer,
)
from products.models import ProductType, Product, ProductStorageCount, Storage, Provider
from users.models import Order, OrderProducts


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
    characteristics = ProductСharacteristicNestedSerializer(
        many=True, source="product_characteristic"
    )

    storage_counts = ProductStorageCountNestedSerializer(
        many=True, source="product_storage_count"
    )

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
            "characteristics",
            "storage_counts",
        )
        depth = 1


class OrderCreateSerializer(serializers.ModelSerializer):
    order_products = OrderProductsCreateNestedSerializer(many=True)

    class Meta:
        model = Order
        fields = ("id", "datetime", "payment_type", "storage", "order_products")

    def create(self, validated_data):
        order_products_data = validated_data.pop("order_products")

        order = Order.objects.create(
            **validated_data, user=self.context["request"].user
        )

        for order_product_item in order_products_data:
            order_product = OrderProducts.objects.create(
                **order_product_item, order=order
            )

            product_storage_count = ProductStorageCount.objects.get(
                product=order_product_item["product"],
                storage=validated_data["storage"],
            )

            product_storage_count.count = (
                product_storage_count.count - order_product.count
            )
            product_storage_count.save()

        print(order)

        return Order.objects.get(id=order.id)


class OrderListSerializer(serializers.ModelSerializer):
    order_products = OrderProductsListNestedSerializer(many=True)

    class Meta:
        model = Order
        fields = ("id", "datetime", "payment_type", "storage", "order_products")


class StorageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ["id", "address"]
        depth = 1


class ProviderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ["id", "name"]
        depth = 1
