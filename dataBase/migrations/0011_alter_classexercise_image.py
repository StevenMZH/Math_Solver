# Generated by Django 5.1.1 on 2025-01-25 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataBase', '0010_alter_classexercise_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classexercise',
            name='image',
            field=models.URLField(blank=True, null=True),
        ),
    ]
