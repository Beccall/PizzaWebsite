from django.db import models


class Topping(models.Model):
    topping = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.topping}"


class MenuItem(models.Model):
    type = models.CharField(max_length=64)
    name = models.CharField(max_length=64, blank=True, null=True)
    size = models.CharField(max_length=64, blank=True, null=True)
    base_price = models.CharField(max_length=64)
    topping_price = models.CharField(max_length=64, blank=True, null=True)

    def __str__(self):
        return f"{self.type}, {self.name}, {self.size}, base price: {self.base_price}, topping price: {self.topping_price}"


class Order(models.Model):
    name = models.CharField(max_length=64)
    time = models.CharField(max_length=64)

    def __str__(self):
        return f"Order #{self.id}, User name: {self.name}, order time: {self.time}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="item")
    menuitem = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name="item", blank=True, null=True)

    def __str__(self):
        return f"Order #{self.order.id}, item #{self.id}: {self.menuitem.type}"
#
#
class ItemTopping(models.Model):
    item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="item")
    itemtopping = models.ForeignKey(Topping, on_delete=models.CASCADE, related_name="itemtopping", blank=True, null=True)

    def __str__(self):
        return f"{self.item}: {self.itemtopping}"



