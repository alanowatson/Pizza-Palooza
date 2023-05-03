Rails.application.routes.draw do
  root to: 'home#index'

  resources :users, only: [:create]
  post 'login', to: 'authentication#login'

  namespace :api do
    namespace :v1 do
      resources :pizzas, only: [:index, :create, :update, :destroy]
      resources :toppings, only: [:index, :create, :update, :destroy]
    end
  end

  match '*path', to: 'home#index', via: :all
end
