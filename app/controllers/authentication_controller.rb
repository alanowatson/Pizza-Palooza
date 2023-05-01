class AuthenticationController < ApplicationController
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      render json: { message: 'Logged in successfully', role: user.role }, status: :ok
    else
      render json: { message: 'Invalid email or password' }, status: :unauthorized
    end
  end
end
