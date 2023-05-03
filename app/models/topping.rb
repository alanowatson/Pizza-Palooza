class Topping < ApplicationRecord
  has_many :pizza_toppings, dependent: :destroy
  has_many :pizzas, through: :pizza_toppings

  # In my mind we don't want a Mushroom and Olive pizza
  # that only has one of the ingredients
  def delete_associated_pizzas
    self.pizzas.each do |pizza|
      if pizza.toppings.include?(self)
        pizza.destroy
      end
    end
  end
end
