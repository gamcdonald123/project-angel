import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }


  connect() {

    this.geoLocate()

    console.log(window.globalCurrentLongitude);
    console.log(window.globalCurrentLatitude);

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
    let start = "-0.07707799702848642,51.53281557674937"
    let end = "-0.1530621981637358,51.52629852471669"
    this.getRoute(start)


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

  geoLocate(start, end) {

    navigator.geolocation.getCurrentPosition((data) => {

      const { longitude, latitude } = data.coords;
      this.map.setCenter([longitude, latitude]);
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(this.map);
        console.log(data.coords.latitude)
        console.log(data.coords.longitude)
        // console.log({ longitude, latitude });

        window.globalCurrentLongitude = longitude;
        window.globalCurrentLatitude = latitude;
    });
  }

  getRoute() {

    const accessToken = "pk.eyJ1IjoiZ2FtY2RvbmFsZDEyMyIsImEiOiJjbHNsc25ybWkwMmJxMm1xb3U2cXhnMGhjIn0.2xgoKDVEBTSGsghazmqAeA"

    const base_url = "https://api.mapbox.com/directions/v5/mapbox/walking/"
    const url = `${base_url}-0.07707799702848642,51.53281557674937;-0.1530621981637358,51.52629852471669?steps=true&geometries=geojson&access_token=${accessToken}`
    const geojson = {}
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        let route = data.geometry.coordinates
        geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        }
      })

      // if the route already exists on the map, we'll reset it using setData

      if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });

    }

    map.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Add starting point to the map
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: start
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });
      // this is where the code from the next step will go
    });
  }
}
