module Api
  module V1
    class PizzasController < ApiController
      def index
        pizzas = Pizza.includes(:toppings).all
        render json: pizzas, include: [:toppings]
      end

    def create
      puts params
      begin
      pizza = Pizza.new(pizza_params)
      topping_ids = params[:topping_ids]
      toppings = Topping.where(id: topping_ids)
      pizza.toppings << toppings
      pizza.save
      render json: pizza, include: [:toppings], status: :created
      rescue => e
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
        @pizza = Pizza.find(params[:id])
        topping_ids = params[:topping_ids]
        new_toppings = Topping.where(id: topping_ids)
        @pizza.update({:name=>params[:name],:toppings=>new_toppings})
        render json: @pizza
      rescue => e
        render json: { error: "Unable to update pizza: #{e.message}" }, status: 422
      end
    end

    private

    def pizza_params
      params.require(:pizza).permit(:name, topping_ids: [])
    end

    end
  end
end
