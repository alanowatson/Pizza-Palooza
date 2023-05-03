# app/controllers/api/v1/toppings_controller.rb
class Api::V1::ToppingsController < ApiController
  def index
    @toppings = Topping.all
    render json: @toppings
  end

  def create
    begin
      topping = Topping.new(topping_params)
      topping.save
      render json: topping, status: :created
    rescue => e
      render json: topping.errors, status: :unprocessable_entity
    end
  end

  def update
    begin
      @topping = Topping.find(params[:id])
      @topping.update(topping_params)
      @topping.save
      render json: @topping
    rescue => e
      render json: { error: "Unable to update topping: #{e.message}" }, status: 422
    end
  end

  def destroy
    begin
      topping = Topping.find(params[:id])
      topping.delete_associated_pizzas
      topping.destroy
    rescue => e
      render json: { error: "Unable to delete Topping: #{e.message}" }, status: 422
    end
  end

  private

  def topping_params
    params.require(:topping).permit(:name)
  end

end
