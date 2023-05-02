# Clear existing data
Pizza.destroy_all
Topping.destroy_all

pepperoni = Topping.create!(name: "Pepperoni")
mushrooms = Topping.create!(name: "Mushrooms")
onions = Topping.create!(name: "Onions")
sausage = Topping.create!(name: "Sausage")
bell_peppers = Topping.create!(name: "Bell Peppers")
olives = Topping.create!(name: "Olives")

# Create pizzas with hardcoded topping combinations
pizza1 = Pizza.create!(name: "Pepperoni & Mushroom Pizza")
pizza1.toppings << pepperoni
pizza1.toppings << mushrooms

pizza2 = Pizza.create!(name: "Vegetarian Pizza")
pizza2.toppings << mushrooms
pizza2.toppings << onions
pizza2.toppings << bell_peppers
pizza2.toppings << olives

pizza3 = Pizza.create!(name: "Supreme Pizza")
pizza3.toppings << pepperoni
pizza3.toppings << mushrooms
pizza3.toppings << onions
pizza3.toppings << sausage
pizza3.toppings << bell_peppers

pizza4 = Pizza.create!(name: "Sausage & Onion Pizza")
pizza4.toppings << sausage
pizza4.toppings << onions

pizza5 = Pizza.create!(name: "Mushroom & Olive Pizza")
pizza5.toppings << mushrooms
pizza5.toppings << olives
