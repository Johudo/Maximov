from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django_resized import ResizedImageField

from .utils import get_current_year, path_and_rename_products_images


class Сharacteristic(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(
        verbose_name="Название характиеристики", max_length=128, unique=True
    )

    class Meta:
        db_table = "characteristic"
        ordering = ["id", "name"]
        verbose_name = "Характеристика"
        verbose_name_plural = "Характеристики"

    def __str__(self):
        return self.name


class ProductType(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(verbose_name="Название товара", max_length=128, unique=True)

    class Meta:
        db_table = "product_type"
        ordering = ["id", "name"]
        verbose_name = "Тип товара"
        verbose_name_plural = "Типы товара"

    def __str__(self):
        return self.name


class Provider(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(
        verbose_name="Название компании поставщика", max_length=128, unique=True
    )

    class Meta:
        db_table = "provider"
        ordering = ["id", "name"]
        verbose_name = "Поставщик"
        verbose_name_plural = "Поставщики"

    def __str__(self):
        return self.name


class Country(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(verbose_name="Название страны", max_length=128, unique=True)

    class Meta:
        db_table = "country"
        ordering = ["id", "name"]
        verbose_name = "Страна производитель"
        verbose_name_plural = "Страны производители"

    def __str__(self):
        return self.name


class Storage(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    address = models.CharField(verbose_name="Адрес склада", max_length=128, unique=True)

    class Meta:
        db_table = "storage"
        ordering = ["id", "address"]
        verbose_name = "Склад"
        verbose_name_plural = "Склады"

    def __str__(self):
        return self.address


class Product(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    сreation_year = models.PositiveIntegerField(
        verbose_name="Год выпуска",
        default=get_current_year(),
        validators=[MinValueValidator(1900), MaxValueValidator(get_current_year())],
    )
    price = models.DecimalField(verbose_name="Цена", max_digits=9, decimal_places=2)
    name = models.CharField(verbose_name="Название товара", max_length=300, unique=True)

    image = ResizedImageField(
        verbose_name="Фото",
        size=[1000, 1000],
        quality=100,
        crop=["middle", "center"],
        upload_to=path_and_rename_products_images,
        default="default-product.jpg",
    )

    type = models.ForeignKey(
        ProductType,
        verbose_name="Тип товара",
        on_delete=models.CASCADE,
        related_name="products",
    )

    provider = models.ForeignKey(
        Provider,
        verbose_name="поставщик",
        on_delete=models.CASCADE,
        related_name="products",
    )

    country = models.ForeignKey(
        Country,
        verbose_name="Страна производитель",
        on_delete=models.CASCADE,
        related_name="products",
    )

    class Meta:
        db_table = "product"
        ordering = ["id", "name"]
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return self.name


class ProductСharacteristic(models.Model):

    product = models.ForeignKey(
        Product,
        verbose_name="Товар",
        on_delete=models.CASCADE,
        related_name="product_characteristic",
    )

    characteristic = models.ForeignKey(
        Сharacteristic,
        verbose_name="Характеристика",
        on_delete=models.CASCADE,
        related_name="product_characteristic",
    )

    value = models.CharField(verbose_name="Значение", max_length=128)

    class Meta:
        unique_together = (("product", "characteristic"),)
        db_table = "product_characteristic"
        ordering = ["product", "characteristic"]
        verbose_name = "Характеристика товара"
        verbose_name_plural = "Характеристики товаров"

    def __str__(self):
        return (
            "Продукт: "
            + str(self.product)
            + ", Характеристика: "
            + str(self.characteristic)
        )


class ProductStorageCount(models.Model):

    product = models.ForeignKey(
        Product,
        verbose_name="Товар",
        on_delete=models.CASCADE,
        related_name="product_storage_count",
    )

    storage = models.ForeignKey(
        Storage,
        verbose_name="Склад",
        on_delete=models.CASCADE,
        related_name="product_storage_count",
    )

    count = models.PositiveIntegerField(verbose_name="Количество")

    class Meta:
        unique_together = (("product", "storage"),)
        db_table = "product_storage_count"
        ordering = ["product", "storage"]
        verbose_name = "Количество товара"
        verbose_name_plural = "Количество товара"

    def __str__(self):
        return "Продукт: " + str(self.product) + ", Склад: " + str(self.storage)
