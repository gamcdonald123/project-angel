class SafePlacesController < ApplicationController
  def index
    @safe_places = SafePlace.all
  end

  def show
    @safe_place = SafePlace.find(params[:id])
  end
end
