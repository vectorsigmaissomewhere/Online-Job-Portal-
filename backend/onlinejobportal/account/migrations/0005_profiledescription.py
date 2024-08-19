# Generated by Django 5.0.8 on 2024-08-18 21:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_testimage_image_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProfileDescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, null=True)),
                ('phonenumber', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile_description', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
