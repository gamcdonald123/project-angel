import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }


  connect() {

    this.geoLocate()

    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-0.15, 51.500394],
      zoom: 16
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

      const { longitude, latitude } = data.coords;
      this.map.setCenter([longitude, latitude]);
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(this.map);
        console.log(data.coords.latitude)
        console.log(data.coords.longitude)
    });
  }

  directions() {

    const accessToken = "pk.eyJ1IjoiZ2FtY2RvbmFsZDEyMyIsImEiOiJjbHNsc25ybWkwMmJxMm1xb3U2cXhnMGhjIn0.2xgoKDVEBTSGsghazmqAeA"

    let base_url = "https://api.mapbox.com/directions/v5/mapbox/walking/"

    let start_lon = -0.07698677948602754
    let start_lat = 51.532853874682786
    let end_lon = -0.077315
    let end_lat = 51.524187

    let url = base_url + start_lon + "," + start_lat + ";" + end_lon + "," + end_lat + "?access_token=" + accessToken

    console.log(url);

    // Use URI to get the directions
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
  }

  directionsTest() {
    let url = "https://api.mapbox.com/directions/v5/driving/{coordinates}"
    fetch(url)
  }
}
