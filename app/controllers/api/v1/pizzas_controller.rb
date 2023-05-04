module Api
  module V1
    class PizzasController < ApiController
      def index
        pizzas = Pizza.includes(:toppings).all
        render json: pizzas, include: [:toppings]
      end

    def create
      pizza = Pizza.new(pizza_params)
      topping_ids = params[:toppings]
      toppings = Topping.where(id: topping_ids)
      pizza.toppings << toppings

      if pizza.save
        render json: pizza, include: [:toppings], status: :created
      else
        render json: { errors: pizza.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      begin
        pizza = Pizza.find(params[:id])
        pizza.destroy
      rescue => e
        render json: { error: "Unable to delete pizza: #{e.message}" }, status: 422
      end
    end


    def update
      begin
        puts pizza_params
        @pizza = Pizza.find(params[:id])
        @pizza.update(pizza_params)
        @pizza.save
        puts @pizza.inspect
        render json: @pizza
      rescue => e
        render json: { error: "Unable to update pizza: #{e.message}" }, status: 422
      end
    end

    private

    def pizza_params
      params.require(:pizza).permit(:name, toppings: [])
    end

    end
  end
end
