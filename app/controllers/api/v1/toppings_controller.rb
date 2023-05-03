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

  def update
    puts "Received parameters: #{params.inspect}"
    begin
      @topping = Topping.find(params[:id])
      @topping.update(topping_params)
      @topping.save
      puts @topping
      render json: @topping
    rescue => e
      render json: { error: "Unable to update topping: #{e.message}" }, status: 422
    end
  end

  def destroy
    topping = Topping.find(params[:id])
    topping.delete_associated_pizzas
    topping.destroy
  end

  private

  def topping_params
    params.require(:topping).permit(:name)
  end

end
