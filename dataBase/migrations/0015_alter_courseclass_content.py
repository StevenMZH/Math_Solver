# Generated by Django 5.1.1 on 2025-01-27 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataBase', '0014_courseclass_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseclass',
            name='content',
            field=models.TextField(),
        ),
    ]
