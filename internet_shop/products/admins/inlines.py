from django.contrib import admin
from products.models import ProductСharacteristic, ProductStorageCount


class ProductСharacteristicInlineAdmin(admin.TabularInline):
    model = ProductСharacteristic
    extra = 1
    fields = ["characteristic", "value"]


class ProductStorageCountInlineAdmin(admin.TabularInline):
    model = ProductStorageCount
    extra = 1
    fields = ["storage", "count"]
