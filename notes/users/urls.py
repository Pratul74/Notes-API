from django.urls import path
from .views import UserList, UserRegister
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns=[
    path('', UserList.as_view(), name="users" ),
    path('register/', UserRegister.as_view(), name="user-registration"),
    path('login/', TokenObtainPairView.as_view(), name="login"),
    path('refresh/', TokenRefreshView.as_view(), name="token_refresh")
]