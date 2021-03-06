from django.contrib import admin
from products.models import Product–°haracteristic, ProductStorageCount


class Product–°haracteristicInlineAdmin(admin.TabularInline):
    model = Product–°haracteristic
    extra = 1
    fields = ["characteristic", "value"]


class ProductStorageCountInlineAdmin(admin.TabularInline):
    model = ProductStorageCount
    extra = 1
    fields = ["storage", "count"]
