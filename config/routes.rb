Rails.application.routes.draw do
  root 'users#home'
  get 'users/find' => 'users#find'
  get 'messages' => 'messages#index'
  devise_for :users, :controllers => {
    :registrations => 'users/registrations'
  }
  resources :users, only: [:show]
  resources :friendships, only: [:create, :destroy]

  namespace :api, { format: 'json'} do
    resources :messages, only: [:index, :create]
    get 'users' => 'users#index'
    get 'friends' => 'users#friend'
  end
end
