from django.urls import path
from .views import CurrentUserView, RegisterView, LoginView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("api/register/", RegisterView.as_view(), name="token_obtain_pair"),
    path("api/login/", LoginView.as_view(), name="token_obtain_pair"),
    path("api/logout/", LogoutView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/users/me/", CurrentUserView.as_view(), name="current_user"),
]
