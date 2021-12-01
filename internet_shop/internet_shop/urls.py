from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.models import Group
from users import views

urlpatterns = [
    path("register", views.register, name="register"),
    path("", admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# admin.site.unregister(Group)
admin.site.site_header = "Интеренет-магазин"
admin.site.login_template = "admin/login.html"
admin.autodiscover()
