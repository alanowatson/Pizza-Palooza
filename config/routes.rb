Rails.application.routes.draw do
  root to: 'home#index'

  resources :users, only: [:create]
  post 'login', to: 'authentication#login'

  # Other routes for pizzas and toppings

  match '*path', to: 'home#index', via: :all
end
