from django.contrib.postgres import serializers
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import MenuItem, Topping, Order, OrderItem, ItemTopping
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render, redirect
from .forms import RegisterForm
import json
from django.forms.models import model_to_dict
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, "orders/index.html")


def menu(response):
    context = {
        "pizza_menu": MenuItem.objects.filter(type="pizza"),
        "sub_menu": MenuItem.objects.filter(type="sub"),
        "pasta_menu": MenuItem.objects.filter(type="pasta"),
        "salad_menu": MenuItem.objects.filter(type="salad"),
        "platter_menu": MenuItem.objects.filter(type="dinner platter"),
        "toppings": Topping.objects.all(),
    }


    return render(response, "orders/menu.html", context)


def order(request):
    menuitems = MenuItem.objects.all()
    # menuitems_dict = model_to_dict(menuitems)
    model_list = []
    for item in menuitems:
        model_list.append(model_to_dict(item))


    context = {
        "menu_items": {
            "Pizza": MenuItem.objects.filter(type="pizza", size="small"),
            "Subs": MenuItem.objects.filter(type="sub", size="small"),
            "Pasta": MenuItem.objects.filter(type="pasta"),
            "Salads": MenuItem.objects.filter(type="salad"),
            "Platters": MenuItem.objects.filter(type="dinner platter", size="small"),
        },
        "toppings": Topping.objects.all(),
        "model_list": json.dumps(model_list),
    }

    return render(request, "orders/order.html", context)

def register(response):
    if response.method == "POST":
        form = RegisterForm(response.POST)
        if form.is_valid():
            form.save()

    else:
        form = RegisterForm()

    return render(response, "orders/register.html", {"form": form})
