# Generated by Django 5.0.8 on 2024-08-11 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_testimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestDescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('testname', models.CharField(max_length=100)),
                ('testdescription', models.CharField(max_length=100)),
            ],
        ),
    ]