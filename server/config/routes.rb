Rails.application.routes.draw do
  devise_for :users

  root to: "home#index"
  
  get 'auth/facebook/callback', to: 'sessions#create'
end
