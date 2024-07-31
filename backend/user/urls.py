from django.urls import path
from .views import UserSignupView, UserSigninView, UserDetailView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user-signup'),
    path('signin/', UserSigninView.as_view(), name='user-signin'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
]
