module Api
  module V1
    class PizzasController < ApiController
      def index
        pizzas = Pizza.includes(:toppings).all
        render json: pizzas, include: [:toppings]
      end

    def create
      pizza = Pizza.new(pizza_params)
      topping_ids = params[:topping_ids]
      toppings = Topping.where(id: topping_ids)
      pizza.toppings << toppings

      if pizza.save
        render json: pizza, include: [:toppings], status: :created
      else
        render json: { errors: pizza.errors.full_messages }, status: :unprocessable_entity
      end
    end

      private

      def pizza_params
        params.require(:pizza).permit(:name, topping_ids: [])
      end

      # Other actions (e.g., create) should go here
    end
  end
end
