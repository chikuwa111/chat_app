Rails.application.routes.draw do
  devise_for :users, :controllers => {
    :registrations => 'users/registrations'
  }
  resources :users, only: [:index]
  resources :friendships, only: [:create, :destroy]
  get 'messages' => 'messages#index'
  get 'users/find' => 'users#find'
  root 'users#home'

  namespace :api, { format: 'json'} do
    resources :messages, only: [:index, :create]
    get 'users' => 'users#index'
    get 'friends' => 'users#friend'
  end
end
