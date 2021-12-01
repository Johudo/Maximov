from django.contrib import admin

from users.admins.inlines import OrderProductsInlineAdmin
from users.models import PaymentType, User, Order, OrderProducts, Bonus


@admin.register(PaymentType)
class PaymentTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    fields = ["name"]


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "login",
        "email",
        "password",
        "phone",
        "birthday",
        "is_active",
        "is_superuser",
    ]
    fields = [
        "login",
        "email",
        "phone",
        "birthday",
        "is_active",
        "is_superuser",
        "groups",
    ]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderProductsInlineAdmin]
    list_display = ["id", "date", "time", "user", "payment_type", "storage"]
    fields = ["date", "time", "user", "payment_type", "storage"]


@admin.register(OrderProducts)
class OrderProductsAdmin(admin.ModelAdmin):
    list_display = ["product", "order", "count"]
    fields = ["product", "order", "count"]


@admin.register(Bonus)
class BonusAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "reason", "count"]
    fields = ["user", "reason", "count"]
