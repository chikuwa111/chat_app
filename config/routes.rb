Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index]
  get 'messages' => 'messages#index'
  root 'users#home'

  namespace :api, { format: 'json'} do
    resources :messages, only: [:index, :create]
    resources :users, only: [:index]
  end
end
