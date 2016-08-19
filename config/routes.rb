Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index]
  resources :friendships, only: [:create, :destroy]
  get 'messages' => 'messages#index'
  get 'users/find' => 'users#find'
  root 'users#home'

  namespace :api, { format: 'json'} do
    resources :messages, only: [:index, :create]
    resources :users, only: [:index]
  end
end
