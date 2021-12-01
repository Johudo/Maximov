from django.contrib import admin
from users.models import OrderProducts


class OrderProductsInlineAdmin(admin.TabularInline):
    model = OrderProducts
    extra = 1
    list_display = ["product", "count"]
