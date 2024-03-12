Rails.application.routes.draw do
  get 'crimes/index'
  get 'crimes/show'
  get 'safe_places/index'
  get 'safe_places/show'
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
resources :reports, only: %i[index show new create]
resources :safe_places, only: %i[index show]
resources :chatrooms do
  resources :messages, only: :create
end

resources :profiles, only: %i[show edit update]

get "map", to: "pages#map"
get "map/token", to: "pages#get_map_token"
get "homepage", to: "pages#app"

end
