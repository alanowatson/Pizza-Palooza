# app/controllers/api/v1/toppings_controller.rb
class Api::V1::ToppingsController < ApiController
  def index
    @toppings = Topping.all
    render json: @toppings
  end

  def create
    existing_topping = Topping.find_by(name: topping_params[:name])
    if existing_topping
      render json: { error: 'Topping already exists' }, status: :unprocessable_entity
    else
      topping = Topping.new(topping_params)
      if topping.save
        render json: topping, status: :created
      else
        render json: topping.errors, status: :unprocessable_entity
      end
    end
  end

  private

  def topping_params
    params.require(:topping).permit(:name)
  end
end
