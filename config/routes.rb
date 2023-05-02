Rails.application.routes.draw do
  root to: 'home#index'

  resources :users, only: [:create]
  post 'login', to: 'authentication#login'

  namespace :api do
    namespace :v1 do
      resources :pizzas, only: [:index]
      resources :toppings, only: [:index, :create]
    end
  end

  match '*path', to: 'home#index', via: :all
end
