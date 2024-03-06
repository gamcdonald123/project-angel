class CrimesController < ApplicationController
  def index
    @crimes = Crime.all

    @markers = @crimes.geocoded.map do |crime|
      {
        lat: crime.latitude,
        lng: crime.longitude,
      }
    end
  end

  def show
    @crime = Crime.find(params[:id])
  end
end
