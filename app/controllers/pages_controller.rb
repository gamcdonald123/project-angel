class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def map
    @crimes = Crime.all

    @markers = @crimes.map do |crime|
      {
        lat: crime.latitude,
        lng: crime.longitude
      }
    end
  end
end
