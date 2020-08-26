function SaveDataToLocalStorage(data)
{
    var a = [];
    // Parse the serialized data back into an array of objects
    a = JSON.parse(localStorage.getItem('items')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value
    localStorage.setItem('items', JSON.stringify(a));
}
let num = 0

document.addEventListener('DOMContentLoaded', () => {
    // shopping_cart_items = JSON.parse(localStorage.getItem('items'));
    // console.log(shopping_cart_items)
    // let shopping_cart = document.getElementById('shopping-cart');
    // shopping_cart.innerHTML = shopping_cart_items
    let buttons = document.querySelectorAll("#buttondropdownitem");
    let menuitem_modal_title = document.getElementById("staticBackdropLabel")
    let radio_buttons = document.getElementById("radio-buttons");
    let topping_checkbox = document.getElementById("topping-checkbox");
    let price_box = document.getElementById("price");
    let price_per_topping = document.getElementById('topping-price');
    let total_price= 0
    let topping_total_price = 0
    let toppings = document.querySelectorAll("#topping-check");

    //for each MENU ITEM button
    for (var i = 0; i < buttons.length; i++) {
        //on menu item button is clicked
        buttons[i].onclick = function () {
            list_of_toppings = []
            let amount = 1
            let name = this.innerHTML;
            let id = this.value - 1;
            //default base_price to "small" price
            let base_price = model[id].base_price;
            //defauly topping price is default "small" price
            let topping_price = model[id].topping_price;
            if (model[id].topping_price === null || model[id+1].topping_price === null) {
                price_per_topping.innerHTML = "";
            }else{
                price_per_topping.innerHTML = "$" + topping_price + " per topping.";
            };

            total_price= (Number(base_price) + Number(topping_total_price)) * amount;

            menuitem_modal_title.innerHTML = name + " " + model[id].type;
            price_box.innerHTML = total_price.toFixed(2);


            //if size column is null, do not display small/large radio buttons
            if (model[id].size === null) {
                radio_buttons.style.display = "none";
                size = ""
            } else {
                radio_buttons.style.display = "block";
                size = "small"
            };

            //if topping_price column is null, do not have topping options.
            if (model[id + 1].topping_price === null) {
                topping_checkbox.style.display = "none";
            } else {
                topping_checkbox.style.display = "block";
            };

            //when SMALL radio button is clicked, change base, topping, and total price to reflect "small".
            document.getElementById('small').onclick = () => {
                base_price = model[id].base_price;
                topping_price = model[id].topping_price;
                topping_total_price = (total_count * topping_price);
                if (model[id].topping_price === null || model[id+1].topping_price === null) {
                    price_per_topping.innerHTML = "";
                }else{
                    price_per_topping.innerHTML = "$" + topping_price + " per topping.";
                }
                total_price= (Number(base_price) + Number(topping_total_price)) * amount;
                price_box.innerHTML = total_price.toFixed(2);
                size = "small";
            };

            //when LARGE radio button is clicked, change base, topping, and total price to reflect "large".
            document.getElementById('large').onclick = () => {
                base_price = model[id + 1].base_price;
                topping_price = model[id + 1].topping_price;
                topping_total_price = (total_count * topping_price);
                if (model[id].topping_price === null || model[id+1].topping_price === null) {
                    price_per_topping.innerHTML = "";
                }else{
                    price_per_topping.innerHTML = "$" + topping_price + " per topping.";
                }
                total_price= (Number(base_price) + Number(topping_total_price)) * amount;
                price_box.innerHTML = total_price.toFixed(2);
                size = "large";
            };

            document.getElementById('close-modal').onclick = () => {
                // window.location.replace('/order')
            };

            //for all TOPPING checkboxes.
            let total_count = 0
            for (var i = 0; i < toppings.length; i++) {
                let topping_name = toppings[i].value
                let count = 0
                toppings[i].onclick = () => {
                    if (count === 0) {
                        count = 1;
                        total_count++;
                        list_of_toppings.push(topping_name)
                    } else {
                        count = 0;
                        total_count--;
                        for (var i = 0; i < list_of_toppings.length; i++){
                            if (list_of_toppings[i] === topping_name){
                                list_of_toppings.splice(i,1);
                            };
                        };

                    };
                    console.log(list_of_toppings)
                    topping_total_price = (total_count * topping_price)
                    total_price= (Number(base_price) + Number(topping_total_price)) * amount
                    price_box.innerHTML = total_price.toFixed(2);
                };

                let span_amount = document.querySelector('#amount');
                let increment = document.getElementById('increment');
                let decrement = document.getElementById('decrement');
                increment.onclick = ()=> {
                    amount++;
                    span_amount.innerHTML = amount;
                    total_price= (Number(base_price) + Number(topping_total_price)) * amount
                    document.getElementById("price").innerHTML = total_price.toFixed(2);

                };
                    decrement.onclick = () => {
                        if (amount >= 1) {
                            amount--;
                        span_amount.innerHTML = amount;
                        total_price= (Number(base_price) + Number(topping_total_price)) * amount;
                        price_box.innerHTML = total_price.toFixed(2);
                    };
                };




            };

            shopping_cart_total = document.getElementById('shopping-cart-total');

            submit_item = document.getElementById('submit-item')
            // let shopping_amount = document.getElementById("shopping-amount");
            // let shopping_cart = document.getElementById('shopping-cart');
            // let shopping_price = document.getElementById('shopping-price');
            // let shopping_topping = document.getElementById('shopping-topping!');
            submit_item.onclick = () =>{
                num ++
                shopping_ul = document.createElement('ul')
                shopping_ul.setAttribute('class', num)
                total_ul = document.createElement('ul')
                total_ul.setAttribute('class', num)

                increment_button = document.createElement('button');
                increment_button.setAttribute('id', 'increment-shopping')
                increment_button.setAttribute('class', num)
                decrement_button = document.createElement('button');
                decrement_button.setAttribute('id', 'decrement-shopping')
                decrement_button.setAttribute('class', num)
                increment_button.innerHTML = "+"
                decrement_button.innerHTML = "-"


                amount_li = document.createElement('span');
                amount_li.setAttribute('class', num);
                amount_li.setAttribute('value', amount);
                amount_li.innerHTML = amount;

                cart_li = document.createElement('li');
                cart_li.setAttribute('class', num);
                cart_li.innerHTML = size + " " + model[id].type + ": " + model[id].name;


                topping_cart_li = document.createElement('li');
                topping_cart_li.innerHTML = "---" + list_of_toppings;
                topping_cart_li.setAttribute('class', num);

                space_li = document.createElement('hr');
                space_li.setAttribute('class', num);

                price_li = document.createElement('li');
                price_li.style.display = 'inline';
                // let base_plus_topping = Number(topping_total_price) + Number(base_price)
                price_li.setAttribute("value", total_price.toString())
                // price_li.value = total_price.toString()
                console.log('SUbmitted price1: ' + total_price.toString())
                console.log('SUbmitted price2: ' + total_price.toFixed(2))
                console.log('SUbmitted price3: ' + price_li.value)
                price_li.innerHTML = "$" + total_price.toFixed(2);
                price_li.setAttribute('class', num)

                add_sub_li = document.createElement('li');
                add_sub_li.setAttribute('class', num)
                add_sub_li.style.display = 'inline';

                delete_button = document.createElement('button');
                delete_button.innerHTML = 'x';
                delete_button.setAttribute('class', num);

                add_sub_li.append(decrement_button, amount_li, increment_button)
                shopping_ul.append(cart_li, topping_cart_li)
                total_ul.append(add_sub_li, price_li, delete_button, space_li)


                shopping_items = document.getElementById('shopping-items')
                shopping_totals = document.getElementById('shopping-totals')

                shopping_items.append(document.createElement('hr'))
                shopping_items.append(shopping_ul)
                shopping_totals.append(document.createElement('hr'))
                shopping_totals.append(total_ul)

                // shopping_amount.append(decrement_button, amount_li, increment_button)
                // shopping_cart.append(cart_li)
                // shopping_topping.append(topping_cart_li)
                // shopping_price.append(price_li)

                // stored_item = model[id].type + " x" + amount + " "+ model[id].name + " " + size + " = $" + total_price.toFixed(2) + " " + list_of_toppings + "\n";
                // SaveDataToLocalStorage(stored_item)

                document.getElementById('close-modal').click()
            }

        };




};


$('#shoppingcart').on('shown.bs.modal', function () {
    delete_button.onclick = () => {
        let name = delete_button.className
        console.log(name)
        let elements = document.getElementsByClassName(name);
        console.log(elements)
        for (let i = elements.length - 1; i >= 0; i--) {
            elements[i].remove();
        }
        for (var element of elements) {
            element.remove();
        }
        ;

    };
    //TODO: make total_amount == amount of items per menuitem in shoppingcart -- get from amount_li?
    let total_amount = 1
    console.log("amount = "  + Number(amount_li.value))
    decrement_button.onclick = () =>{
        // let name = decrement_button.className;
        // console.log(name)
        // let elements = document.getElementsByClassName("amount" + name);
        // total_amount =  elements.innerHTML

        //if decrement from 1, click delete button.
        if (total_amount === 1){
            delete_button.click()
        }else{
            total_amount --;
            amount_li.innerHTML = total_amount;
            var new_price = price_li.value * total_amount
            price_li.innerHTML = "$" + new_price.toFixed(2);
            // add_sub_li.append(decrement_button, amount_li, increment_button)
        }
    }
    increment_button.onclick = () =>{
        // let name = increment_button.className;
        // console.log(name)
        // let elements = document.getElementsByClassName("amount" + name);
        // total_amount =  elements.innerHTML
        // console.log("innerhtml = " + elements.innerHTML)

        total_amount ++;
        amount_li.innerHTML = total_amount;
        console.log('Amount: ' + amount_li.value)
        var new_price = price_li.value * total_amount
        price_li.innerHTML = "$" + new_price.toFixed(2);
        // add_sub_li.append(decrement_button, amount_li, increment_button)

    }


});


document.getElementById('clear-cart').onclick = () =>{
    localStorage.clear();
    // document.getElementById('close-cart').click();
    window.location.replace('/order')
}



});
