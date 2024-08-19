from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

# Custom User Manager
# BaseUserManager is a class that includes methods for creating User instances
class UserManager(BaseUserManager):
    # create_user function creates saves and return a User
    def create_user(self, email, name, tc, password=None, password2 = None):
        """
        creates and saves a User with the given email, name, tc and password
        """
        if not email:
            raise ValueError("User must have an email address")
        
        user = self.model(
            # normalize_email function lowers the domain portion of the email address
            email = self.normalize_email(email),
            name = name,
            tc = tc,
        )
        # set_password function creates a hashed password 
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    # create_superuser function is same as create_user function but stes is_staff and is_superuser to True i.e create and saves a superuser
    def create_superuser(self, email, name, tc, password=None):
        user = self.create_user(
            email, 
            password=password,
            name=name,
            tc=tc,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

# Custom User Model
# AbstractBaseUser helps to construct a custom user model
# porvides all the necessary functions to create a custom user
class User(AbstractBaseUser):
    email = models.EmailField(
        # verbose_name means field name set to Email 
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name= models.CharField(max_length=200)
    tc = models.BooleanField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name","tc"]

    def __str__(self):
        return self.email
    
    # if the user is inactive, this method will always return False, For an active superuser, this method will always return True
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin
    
    # app_label means name of the app
    # return True if the user has any permissions in the given package 
    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    
    # property() is a built-in function that creates and returns a property object
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    
class TestImage(models.Model):
    image_name = models.CharField(max_length=100, default='default_image_name')  # Provide a default value
    image_url = models.ImageField(upload_to='testImage/')

    def clean(self):
        max_size = 5 * 1024 * 1024  # 5MB
        if self.image_url.size > max_size:
            raise ValidationError("Image file too large ( > 5MB )")

class TestDescription(models.Model):
    testname = models.CharField(max_length=100)
    testdescription = models.CharField(max_length=100)

class ProfileDescription(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='profile_description')
    description = models.TextField(blank=True, null=True)
    phonenumber = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def clean(self):
        max_size = 5 * 1024 * 1024  # 5MB
        if self.profile_picture and self.profile_picture.size > max_size:
            raise ValidationError("Image file too large ( > 5MB )")
    
    def __str__(self):
        return f"{self.user.email}'s Profile Description"
