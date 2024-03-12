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
        center: [longitude, latitude],
        zoom: 16
      });
      // this.map.setCenter([longitude, latitude]);
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

    this.getCrimes()

  }

  #addMarkersToMap(coordinates) {
    // add user position marker
    Object.values(coordinates).forEach((marker) => {

      // console.log(marker);

      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html);

      const customMarker = document.createElement("div")
      customMarker.innerHTML = marker.marker_html

      new mapboxgl.Marker(customMarker)
      .setLngLat([ marker.longitude, marker.latitude ])
      .setPopup(popup)
      .addTo(this.map);
    });
  }

  getCoords() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.coords = data.coords;
      if (this.map) {
        // this.map.setCenter([this.coords.longitude, this.coords.latitude]);
        this.currentUserMarker.remove();
        this.currentUserMarker = new mapboxgl.Marker()
          .setLngLat([this.coords.longitude, this.coords.latitude])
          .addTo(this.map);
      }
    })
  }

  centerMap() {
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
    const { longitude, latitude } = this.coords;
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

  getCrimes() {

    const base_url = "https://data.police.uk/api/crimes-street/all-crime?"


    this.getCoords()

    // console.log(this.coords);

    setTimeout(() => {
      const {latitude, longitude} = this.coords;
      console.log(latitude, longitude);
      // create new variable with last month's date in the format YYYY-MM
      let date = new Date().getFullYear() + "-" + (new Date().getMonth() - 1);
      let category = "violent-crime"

      let url = `${base_url}lat=${latitude.toFixed(4)}&lng=${longitude.toFixed(4)}&date=${date}&category=${category}`;

      // console.log(url);

      fetch(url)
        .then(response => response.json())
        .then((data) => {
          // log the first 40 crimes to console where the category is violent-crime
          let count = 0;
          let crimes = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].category === "violent-crime") {
              crimes.push(data[i]);
              count++;
            }
          }
          let top40crimes = (crimes.slice(0, 40));
          // create an object containing all the longitudes and latitudes of the elements in the array top40crimes
          let coordinates = {};
          for (let i = 0; i < top40crimes.length; i++) {
            // add top40crimes.longitude and top40crimes.latitude and month to the coordinates object
            coordinates[i] = {
              "longitude": top40crimes[i].location.longitude,
              "latitude": top40crimes[i].location.latitude,
              "month": top40crimes[i].month,
              "info_window_html": `<div><h5>Crime Details</h5><p>🧾 Violent crime</p><p>📆 2024-01</p></div>`,
              "marker_html": `<img height="48" width="48" alt="Logo" src="/assets/crime_marker-bd3bed9d884facf2ed0840fe5d0f594e17713625d4a0979f237aa0f184333fd1.png" />`
            };
          }
          // console.log(coordinates);
          this.#addMarkersToMap(coordinates);
        }
        )}, 500);
    }
  }
