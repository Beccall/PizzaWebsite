from django.contrib import admin
from .models import MenuItem, Topping, Order, OrderItem, ItemTopping

#
# class OrderItemsInLine(admin.StackedInline):
#     model = OrderItems.menuitem.through
#     extra = 1
#
#
# class OrderAdmin(admin.ModelAdmin):
#     inlines = [OrderItemsInLine]
#
#
# class Itemtoppings(admin.ModelAdmin):
#     filter_horizontal = ("topping",)


# Register your models here.
admin.site.register(Topping)
admin.site.register(MenuItem)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(ItemTopping)