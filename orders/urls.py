from django.urls import path

from . import views

app_name = 'main'

urlpatterns = [
    path("", views.index, name="index"),
    path("menu/", views.menu, name="menu"),
    path("order/", views.order, name="menu"),
]
