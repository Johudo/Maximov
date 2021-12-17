from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from products.models import Storage, Product


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class PaymentType(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(verbose_name="Вид оплаты", max_length=128, unique=True)

    class Meta:
        db_table = "payment_type"
        ordering = ["id", "name"]
        verbose_name = "Вид оплаты"
        verbose_name_plural = "Виды оплаты"

    def __str__(self):
        return self.name


class User(AbstractUser):

    username = None
    first_name = None
    last_name = None
    date_joined = None

    id = models.AutoField(primary_key=True)
    login = models.CharField(verbose_name="Логин", max_length=128, unique=True)
    email = models.EmailField(verbose_name="Email", max_length=256, unique=True, null=True, blank=True)
    phone = models.CharField(verbose_name="Телефон", max_length=15, unique=True, null=True, blank=True)
    birthday = models.DateField(verbose_name="Дата рождения", null=True, blank=True)

    USERNAME_FIELD = "login"
    REQUIRED_FIELDS = ["email"]

    objects = CustomUserManager()

    class Meta:
        db_table = "user"
        ordering = ["login", "email", "phone", "birthday", "is_active", "is_staff"]
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return self.login


class Order(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    date = models.DateField(verbose_name="Дата")
    time = models.TimeField(verbose_name="Время")

    user = models.ForeignKey(
        User,
        verbose_name="Покупатель",
        on_delete=models.CASCADE,
        related_name="orders",
    )

    payment_type = models.ForeignKey(
        PaymentType,
        verbose_name="Вид оплаты",
        on_delete=models.CASCADE,
        related_name="orders",
    )

    storage = models.ForeignKey(
        Storage,
        verbose_name="Склад",
        on_delete=models.CASCADE,
        related_name="orders",
    )

    class Meta:
        db_table = "order"
        ordering = ["id", "user", "date", "time", "payment_type", "storage"]
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return "Заказ №" + str(self.id)


class OrderProducts(models.Model):

    product = models.ForeignKey(
        Product,
        verbose_name="Товар",
        on_delete=models.CASCADE,
        related_name="order_products",
    )

    order = models.ForeignKey(
        Order,
        verbose_name="Заказ",
        on_delete=models.CASCADE,
        related_name="order_products",
    )

    count = models.PositiveIntegerField(verbose_name="Количество")

    class Meta:
        unique_together = (("product", "order"),)
        db_table = "order_products"
        ordering = ["order", "product"]
        verbose_name = "Товар заказа"
        verbose_name_plural = "Товары заказа"

    def __str__(self):
        return "Заказ: " + str(self.order) + ", Продукт: " + str(self.product)


class Bonus(models.Model):

    id = models.AutoField(primary_key=True, unique=True)

    user = models.ForeignKey(
        User,
        verbose_name="Пользователь",
        on_delete=models.CASCADE,
        related_name="bonuses",
    )

    reason = models.CharField(verbose_name="Причина", max_length=128, unique=True)
    count = models.IntegerField(verbose_name="Количество")

    class Meta:
        db_table = "bonus_history"
        ordering = ["id", "user", "reason", "count"]
        verbose_name = "История бонусов"
        verbose_name_plural = "История бонусов"

    def __str__(self):
        return "Пользователь: " + str(self.user) + ", Причина: " + str(self.reason)
