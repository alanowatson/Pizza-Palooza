class Pizza < ApplicationRecord
  has_and_belongs_to_many :toppings
end
