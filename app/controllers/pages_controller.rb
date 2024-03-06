class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def map
    @crimes = Crime.all

    crime_markers = @crimes.map do |crime|
      {
        type: "crime",
        lat: crime.latitude,
        lng: crime.longitude,
        info_window_html: render_to_string(partial: "crime_info_window", locals: {crime: crime}),
        marker_html: render_to_string(partial: "crime_marker")
      }
    end

    @safe_places = SafePlace.all

    safe_place_markers = @safe_places.map do |safe_place|
      {
        type: "safe_place",
        lat: safe_place.latitude,
        lng: safe_place.longitude,
        info_window_html: render_to_string(partial: "safe_place_info_window", locals: {safe_place: safe_place}),
        marker_html: render_to_string(partial: "safe_place_marker")
      }
    end
    @markers = crime_markers + safe_place_markers
  end
end
