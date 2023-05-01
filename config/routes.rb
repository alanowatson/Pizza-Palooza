Rails.application.routes.draw do
  resources :users, only: [:create]
  post 'login', to: 'authentication#login'
  # Other routes for pizzas and toppings
end
