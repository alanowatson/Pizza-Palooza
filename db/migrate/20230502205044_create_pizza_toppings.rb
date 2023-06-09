class CreatePizzaToppings < ActiveRecord::Migration[7.0]
  def change
    create_table :pizzas_toppings, id: false do |t|
      t.bigint :pizza_id, null: false
      t.bigint :topping_id, null: false
      t.index [:pizza_id, :topping_id], unique: true
      t.index [:topping_id, :pizza_id], unique: true
    end
  end
end
