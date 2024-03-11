import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

export default class extends Controller {
  static values = {
    markers: Array,
    end: Object
  }

  async connect() {
    const resp = await fetch('/map/token');
    const data = await resp.json();
    this.token = data.token;

    this.getCoords();
    // define current marker instance variable
    this.currentUserMarker;
    setTimeout(() => {
      const {latitude, longitude} = this.coords;
      mapboxgl.accessToken = this.token;

      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-0.15, 51.500394],
        zoom: 16
      });
      this.map.setCenter([longitude, latitude]);
      this.currentUserMarker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map);

      this.#addMarkersToMap();
      let toHome = false;
      if ((window.location.search).match(/\?path=(true|false)/)) {
        toHome = (window.location.search).match(/\?path=(true|false)/)[1] === 'true';
      }
      if (toHome) {
        this.getHome()
      }

      setInterval(() => {
        this.getCoords();
      }, 5000);
    }, 400);

  }

  #addMarkersToMap() {
    // add user position marker
    this.markersValue.forEach((marker) => {

      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html);

      const customMarker = document.createElement("div")
      customMarker.innerHTML = marker.marker_html

      new mapboxgl.Marker(customMarker)
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(this.map);
    });
  }

  getCoords() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.coords = data.coords;
      if (this.map) {
        this.map.setCenter([this.coords.longitude, this.coords.latitude]);
        this.currentUserMarker.remove();
        this.currentUserMarker = new mapboxgl.Marker()
          .setLngLat([this.coords.longitude, this.coords.latitude])
          .addTo(this.map);
      }
    })
  }

  async getHome() {
    const { longitude, latitude } =  this.coords;
    // const accessToken = "pk.eyJ1IjoiZ2FtY2RvbmFsZDEyMyIsImEiOiJjbHNsc25ybWkwMmJxMm1xb3U2cXhnMGhjIn0.2xgoKDVEBTSGsghazmqAeA";

    const base_url = "https://api.mapbox.com/directions/v5/mapbox/walking/"
    const url = `${base_url}${[longitude]},${[latitude]};${this.endValue.lon},${this.endValue.lat}?steps=true&geometries=geojson&access_token=${this.token}`
    let geojson = {}
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        // console.log(data.routes[0].geometry);
        let route = data.routes[0].geometry.coordinates
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

    this.map.on('load', () => {
      if (this.map.getSource('route')) {
      this.map.getSource('route').setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        this.map.addLayer({
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
    })
    this.map.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location
      // getRoute(start);

      // Add starting point to the map
      this.map.addLayer({
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
                  // coordinates: start
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
