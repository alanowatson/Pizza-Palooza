module Api
  module V1
    class PizzasController < ApiController
      def index
        @pizzas = Pizza.all
        render json: @pizzas
      end
    end
  end
end
