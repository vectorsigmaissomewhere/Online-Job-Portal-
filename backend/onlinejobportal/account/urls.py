from django.urls import path, include
from account.views import UserRegistrationView, UserLoginView, UserChangePasswordView, TestImageAPI, TestData, ProfileDescriptionView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('register/',UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changpassword'),
    path('uploadImage/', TestImageAPI.as_view(), name='uploadImage'),
    path('testData/', TestData.as_view(), name='testData'),
    path('profileDescription/<int:pk>/', ProfileDescriptionView.as_view(), name='profileDescription'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

