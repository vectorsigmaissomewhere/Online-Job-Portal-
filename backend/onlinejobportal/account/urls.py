from django.urls import path, include
from account.views import UserRegistrationView, UserLoginView, UserChangePasswordView
urlpatterns = [
    path('register/',UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changpassword'),
]