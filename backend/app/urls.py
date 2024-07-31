from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<uuid:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('subvariants/add-stock/<uuid:pk>/', AddStockView.as_view(), name='add-stock'),
    path('subvariants/remove-stock/<uuid:pk>/', RemoveStockView.as_view(), name='remove-stock'),
]
