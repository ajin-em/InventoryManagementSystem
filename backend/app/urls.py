from django.urls import path
from .views import ProductView, ProductUpdateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', ProductView.as_view(), name='product'),
    path('products/<uuid:pk>/', ProductUpdateView.as_view(), name='product-detail'),
]
