from django.contrib import admin
from products.filters import NameFilter
from products.admins.inlines import (
    ProductСharacteristicInlineAdmin,
    ProductStorageCountInlineAdmin,
)

from .models import (
    Сharacteristic,
    ProductType,
    Provider,
    Country,
    Storage,
    Product,
    ProductСharacteristic,
    ProductStorageCount,
)


@admin.register(Сharacteristic)
class СharacteristicAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    fields = ["name"]


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    fields = ["name"]


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    fields = ["name"]


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    fields = ["name"]


@admin.register(Storage)
class StorageAdmin(admin.ModelAdmin):
    list_display = ["id", "address"]
    fields = ["address"]


@admin.register(ProductСharacteristic)
class ProductСharacteristicAdmin(admin.ModelAdmin):
    list_display = ["product", "characteristic", "value"]
    fields = ["product", "characteristic", "value"]


@admin.register(ProductStorageCount)
class ProductStorageCountAdmin(admin.ModelAdmin):
    list_display = ["product", "storage", "count"]
    fields = ["product", "storage", "count"]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductСharacteristicInlineAdmin, ProductStorageCountInlineAdmin]
    list_display = [
        "id",
        "name",
        "сreation_year",
        "price",
        "type",
        "provider",
        "country",
    ]
    fields = [
        "name",
        "сreation_year",
        "price",
        "type",
        "provider",
        "country",
        "image",
    ]

    list_filter = (
        NameFilter,
        ("type__name"),
        ("country__name"),
        ("provider__name"),
    )
