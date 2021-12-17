from rest_framework import serializers
from products.models import ProductСharacteristic, Сharacteristic


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
