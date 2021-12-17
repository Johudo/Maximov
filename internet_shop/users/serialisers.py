from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer as JwtTokenObtainPairSerializer,
)


class TokenObtainPairSerializer(JwtTokenObtainPairSerializer):
    username_field = get_user_model().USERNAME_FIELD


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("login", "email", "first_name", "last_name", "password")


class CurrentUserSeriaizer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "login",
            "email",
            "first_name",
            "last_name",
            "phone",
            "birthday",
        )


class UpdateCurrentUserSeriaizer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "login",
            "email",
            "first_name",
            "last_name",
            "phone",
            "birthday",
        )
