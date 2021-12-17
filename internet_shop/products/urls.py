from django.urls import path
from products.views import ProductListView, ProductTypeListView, ProductDetailView

urlpatterns = [
    path("types/", ProductTypeListView.as_view()),
    path("products/", ProductListView.as_view()),
    path("products/<int:pk>/", ProductDetailView.as_view()),
]
