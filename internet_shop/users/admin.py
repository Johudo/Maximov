from django.contrib import admin

from users.admins.inlines import OrderProductsInlineAdmin
from users.models import User, Order, OrderProducts, Bonus


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "login",
        "email",
        "first_name",
        "last_name",
        "phone",
        "birthday",
        "is_active",
        "is_superuser",
    ]
    fields = [
        "login",
        "email",
        "first_name",
        "last_name",
        "phone",
        "birthday",
        "is_active",
        "is_superuser",
        "groups",
    ]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderProductsInlineAdmin]
    list_display = ["id", "datetime", "user", "payment_type", "storage"]
    fields = ["datetime", "user", "payment_type", "storage"]


@admin.register(OrderProducts)
class OrderProductsAdmin(admin.ModelAdmin):
    list_display = ["product", "order", "count"]
    fields = ["product", "order", "count"]


@admin.register(Bonus)
class BonusAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "reason", "count"]
    fields = ["user", "reason", "count"]
