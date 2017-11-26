Rails.application.routes.draw do
  devise_for :users
  root to: "home#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'auth/facebook/callback', to: 'sessions#create'
end
