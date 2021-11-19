from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class LoginBackend(ModelBackend):
    def authenticate(self, request, **kwargs):
        UserModel = get_user_model()

        try:
            login = kwargs.get("login", None) or kwargs.get("username", None)
            user = UserModel.objects.get(login=login)

            if user.check_password(kwargs.get("password", None)):
                return user

        except UserModel.DoesNotExist:
            return None

        return None
