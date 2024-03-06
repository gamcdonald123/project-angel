import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }


  connect() {

    this.geoLocate()
    console.log(this.current_position)

    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10",
      // center: [current_position.coords.longitude, current_position.coords.latitude],
      zoom: 9
    });

    this.#addMarkersToMap()
    // this.#fitMapToMarkers()
    // console.log(this.geoLocate())

  }

  #addMarkersToMap() {


    this.geoLocate()

    this.markersValue.forEach((marker) => {

      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html);

      const customMarker = document.createElement("div")
      customMarker.innerHTML = marker.marker_html

      new mapboxgl.Marker(customMarker)
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map);
    });

    // this.current_position = this.geoLocate()

    // new mapboxgl.Marker().setLngLat([this.geoLocate])
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()

    // this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }

  geoLocate() {

    navigator.geolocation.getCurrentPosition((data) => {

      window.current_position = data

      new mapboxgl.Marker()
        .setLngLat([ data.coords.longitude, data.coords.latitude ])
        .addTo(this.map);
        // console.log(data.coords.latitude)
        // console.log(data.coords.longitude)
    });

  }
}
