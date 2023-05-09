# Clear existing data
Pizza.destroy_all
Topping.destroy_all

pepperoni = Topping.create!(name: "Pepperoni")
pepperoni.id = 1
pepperoni.save!

mushrooms = Topping.create!(name: "Mushrooms")
mushrooms.id = 2
mushrooms.save!

onions = Topping.create!(name: "Onions")
onions.id = 3
onions.save!

sausage = Topping.create!(name: "Sausage")
sausage.id = 4
sausage.save!

bell_peppers = Topping.create!(name: "Bell Peppers")
bell_peppers.id = 5
bell_peppers.save!

olives = Topping.create!(name: "Olives")
olives.id = 6
olives.save!

# Create pizzas with hardcoded topping combinations
pizza1 = Pizza.create!(name: "Pepperoni & Mushroom Pizza")
pizza1.id = 1
pizza1.save!
pizza1.toppings << pepperoni
pizza1.toppings << mushrooms

pizza2 = Pizza.create!(name: "Vegetarian Pizza")
pizza2.id = 2
pizza2.save!

pizza2.toppings << mushrooms
pizza2.toppings << onions
pizza2.toppings << bell_peppers
pizza2.toppings << olives

pizza3 = Pizza.create!(name: "Supreme Pizza")
pizza3.id = 3
pizza3.save!


pizza3.toppings << pepperoni
pizza3.toppings << mushrooms
pizza3.toppings << onions
pizza3.toppings << sausage
pizza3.toppings << bell_peppers

pizza4 = Pizza.create!(name: "Sausage & Onion Pizza")
pizza4.id = 4
pizza4.save!


pizza4.toppings << sausage
pizza4.toppings << onions

pizza5 = Pizza.create!(name: "Mushroom & Olive Pizza")
pizza5.id = 5
pizza5.save!

pizza5.toppings << mushrooms
pizza5.toppings << olives
