# Generated by Django 4.0b1 on 2021-11-19 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='BonusType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=128, unique=True, verbose_name='Причина')),
            ],
            options={
                'verbose_name': 'Причина поступления бонусов',
                'verbose_name_plural': 'Причины поступления бонусов',
                'db_table': 'bonus_type',
                'ordering': ['id', 'name'],
            },
        ),
        migrations.CreateModel(
            name='PaymentType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=128, unique=True, verbose_name='Вид оплаты')),
            ],
            options={
                'verbose_name': 'Вид оплаты',
                'verbose_name_plural': 'Виды оплаты',
                'db_table': 'payment_type',
                'ordering': ['id', 'name'],
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('login', models.CharField(max_length=128, primary_key=True, serialize=False, unique=True, verbose_name='Логин')),
                ('email', models.EmailField(blank=True, max_length=256, null=True, unique=True, verbose_name='Email')),
                ('phone', models.CharField(blank=True, max_length=15, null=True, unique=True, verbose_name='Телефон')),
                ('birthday', models.DateField(blank=True, null=True, verbose_name='Дата рождения')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Пользователи',
                'db_table': 'user',
                'ordering': ['login', 'email', 'phone', 'birthday'],
            },
        ),
    ]
