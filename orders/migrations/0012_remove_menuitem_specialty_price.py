# Generated by Django 3.0.7 on 2020-06-08 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0011_auto_20200608_1608'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menuitem',
            name='specialty_price',
        ),
    ]
