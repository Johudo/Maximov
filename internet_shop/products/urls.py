from django.urls import path
from products.views import (
    ProductListView,
    ProductTypeListView,
    ProductDetailView,
    OrderCreateView,
    StorageListView,
    ProviderListView,
)

urlpatterns = [
    path("api/types/", ProductTypeListView.as_view()),
    path("api/products/", ProductListView.as_view()),
    path("api/products/<int:pk>/", ProductDetailView.as_view()),
    path("api/orders/", OrderCreateView.as_view({"get": "list", "post": "create"})),
    path("api/storages/", StorageListView.as_view()),
    path("api/providers/", ProviderListView.as_view()),
]
