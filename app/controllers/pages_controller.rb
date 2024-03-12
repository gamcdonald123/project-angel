class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    # rediect to dashboard if user is logged in
    redirect_to homepage_path if user_signed_in?
  end

  def map
    @crimes = Crime.all
    @user = current_user

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

    @home_location = { lon: current_user.home_longitude, lat: current_user.home_latitude }
  end

  def get_map_token
    render json: {token: ENV['MAPBOX_API_KEY']}
  end

  def app
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
