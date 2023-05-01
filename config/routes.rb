Rails.application.routes.draw do
  root to: 'home#index'
  # Other routes
end

Rails.application.routes.draw do
  resources :users, only: [:create]
  post 'login', to: 'authentication#login'
  # Other routes for pizzas and toppings
end
