class Pizza < ApplicationRecord
  has_many :pizza_toppings, dependent: :destroy
  has_many :toppings, through: :pizza_toppings
end
