from django.urls import path
from user.views import *
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', UserSignupView.as_view(), name='user-signup'),
    path('signin/', UserSigninView.as_view(), name='user-signin'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('products/', ProductView.as_view(), name='product'),
    path('products/<uuid:pk>/', ProductUpdateView.as_view(), name='product-detail'),
]
