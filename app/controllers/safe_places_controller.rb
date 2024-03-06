class SafePlacesController < ApplicationController
  def index
    @safe_places = SafePlace.all

    @safe_places = @safe_places.geocoded do |safe_place|
      {
        lat: safe_place.latitude,
        lng: safe_place.longitude,
      }
    end
  end

  def show
    @safe_place = SafePlace.find(params[:id])
  end
end
