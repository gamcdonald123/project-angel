class SafePlacesController < ApplicationController
  def index
  end

  def show
    @safe_place = SafePlace.find(params[:id])
  end
end
