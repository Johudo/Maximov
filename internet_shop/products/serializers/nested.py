from rest_framework import serializers
from products.models import ProductСharacteristic, Product, ProductStorageCount, Storage
from users.models import OrderProducts


class StorageNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = (
            "id",
            "address",
        )


class ProductListNestedSerializer(serializers.ModelSerializer):
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


class ProductСharacteristicNestedSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = ProductСharacteristic
        fields = (
            "name",
            "value",
        )

    def get_name(self, product_characteristic):
        return product_characteristic.characteristic.name


class ProductStorageCountNestedSerializer(serializers.ModelSerializer):
    storage = StorageNestedSerializer()

    class Meta:
        model = ProductStorageCount
        fields = (
            "storage",
            "count",
        )


class OrderProductsCreateNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProducts
        fields = ("id", "product", "count")


class OrderProductsListNestedSerializer(serializers.ModelSerializer):
    product = ProductListNestedSerializer()

    class Meta:
        model = OrderProducts
        fields = ("id", "product", "count")
