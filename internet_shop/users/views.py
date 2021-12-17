from django.contrib.auth import get_user_model

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serialisers import (
    CurrentUserSeriaizer,
    TokenObtainPairSerializer,
    UpdateCurrentUserSeriaizer,
    UserSerializer,
)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                status=HTTP_400_BAD_REQUEST, data={"errors": serializer.errors}
            )

        user = get_user_model().objects.create_user(**serializer.validated_data)

        return Response(status=HTTP_201_CREATED)


class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TokenObtainPairSerializer


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TokenRefreshSerializer

    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh"])
        except TokenError as error:
            return Response(status=HTTP_401_UNAUTHORIZED, data={"error": str(error)})

        token.blacklist()
        return Response(status=HTTP_200_OK)


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = CurrentUserSeriaizer(request.user, context={"request": request})
        return Response(status=HTTP_200_OK, data=serializer.data)

    def patch(self, request):
        serializer = UpdateCurrentUserSeriaizer(
            request.user, data=request.data, partial=True
        )

        if not serializer.is_valid():
            return Response(status=HTTP_400_BAD_REQUEST, data=serializer.errors)

        serializer.save()

        return Response(status=HTTP_200_OK, data=serializer.data)
