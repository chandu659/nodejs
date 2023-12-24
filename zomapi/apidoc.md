// page1
> (GET) List of all Cities
* http://localhost:7896/location

> (GET) List of all Restaurants
* http://localhost:7896/restaurants

> (GET) Restaurants wrt city
* http://localhost:7896/restaurants?stateId=4

> (GET) List of all meal Type
* http://localhost:7896/mealType


// page2
> (GET) Restaurants wrt to mealType
* http://localhost:7896/restaurants?mealId=2
* http://localhost:7896/restaurants?mealId=2&stateId=1

> (GET) filter wrt to mealType + cuisine
* http://localhost:7896/filters?mealId=1&cusineId=1


> (GET) filter wrt to mealType + cost
* completed

> (GET) Sort on basis of price
* completed

> (GET) Pagination
* completed


// Page3
* (GET) Details of the restaurant
> http://localhost:7896/restaurantDetails/7

* (GET) Menu wrt to restaurant
> http://localhost:7896/menu/3

// page4
* (POST) Details of selected menu
> http://localhost:7896/menuDetails

* (POST) Place Order
> http://localhost:7896/placeOrders

// Page5
* (GET) View all order/wrt to email
> 


* (PUT) Update order details
>  

* (DELETE) Delete Order
> 