# Generated by Django 4.0rc1 on 2021-12-17 07:29

from django.db import migrations
import django_resized.forms
import products.utils


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="image",
            field=django_resized.forms.ResizedImageField(
                crop=["middle", "center"],
                default="default-product.jpg",
                force_format=None,
                keep_meta=True,
                quality=100,
                size=[1920, 1080],
                upload_to=products.utils.path_and_rename_products_images,
                verbose_name="Фото",
            ),
        ),
    ]
