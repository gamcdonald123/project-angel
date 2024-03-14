import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

export default class extends Controller {
  static values = {
    markers: Array,
    end: Object
  }



  async connect() {
    // getting mapbox token
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

      let toHome = 0;

      if ((window.location.search).substring((window.location.search).length - 1) === "0") {
        // console.log((window.location.search).substring((window.location.search).length - 1));
        this.getHome()
        const instructions = document.getElementById('instructions')
        instructions.classList.remove("d-none")
      }
      else if ((window.location.search).substring((window.location.search).length - 1) === "1") {
        // console.log("Running getSafe()");
        this.getHospitals(1)
      }

      this.getHospitals(0)
      setInterval(() => {
        this.getCoords();
      }, 5000);
    }, 400);

    this.getCrimes()
    this.getHospitals()

  }

  #addMarkersToMap(coordinates) {
    // add user position marker
    if (coordinates) {
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
  }

  #addHospitalsToMap(coordinates) {
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
    // console.log("Running getHome()");
    const { longitude, latitude } = this.coords;
    // const accessToken = "pk.eyJ1IjoiZ2FtY2RvbmFsZDEyMyIsImEiOiJjbHNsc25ybWkwMmJxMm1xb3U2cXhnMGhjIn0.2xgoKDVEBTSGsghazmqAeA";

    const base_url = "https://api.mapbox.com/directions/v5/mapbox/walking/"
    const url = `${base_url}${[longitude]},${[latitude]};${this.endValue.lon},${this.endValue.lat}?steps=true&geometries=geojson&access_token=${this.token}`
    let steps = []
    let duration = 0;
    let geojson = {}
    let latLngBounds = 0;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        let route = data.routes[0].geometry.coordinates
        steps = data.routes[0].legs[0].steps;
        geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        }
        duration = data.routes[0].duration;

        this.map.fitBounds([
          [longitude, latitude], // southwestern corner of the bounds
          [this.endValue.lon, this.endValue.lat] // northeastern corner of the bounds
        ], {
          padding: 75 // padding in pixels
        });


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


      // get the sidebar and add the instructions
      const instructions = document.getElementById('instructions');

      let tripInstructions = '';
      steps.forEach((step) => {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      })
      instructions.innerHTML = `<h5><strong>Trip duration: ${Math.floor(
        duration / 60
      )} min 🚶‍♀️ </strong></h5><ol>${tripInstructions}</ol>`;

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
      // console.log(latitude, longitude);
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

  getHospitals(getSafe) {
      // console.log("Running getHospitals()");
      this.getCoords()

      setTimeout(() => {
        const {latitude, longitude} = this.coords;

        const base_url = `https://api.mapbox.com/search/searchbox/v1/category/hospital?access_token=pk.eyJ1IjoiZ2FtY2RvbmFsZDEyMyIsImEiOiJjbHNsc25ybWkwMmJxMm1xb3U2cXhnMGhjIn0.2xgoKDVEBTSGsghazmqAeA&language=en&limit=1&proximity=${longitude},${latitude}`;

        let coordinates = {}

        fetch(base_url)
          .then(response => response.json())
          .then((data) => {
            // console.log(data);
            // coordinates(:longitude) = data.features[0].geometry.coordinates[0]
            // safePlace_latitude = data.features[0].geometry.coordinates[1]

            coordinates[0] = {
              "longitude": data.features[0].geometry.coordinates[0],
              "latitude": data.features[0].geometry.coordinates[1],
              "info_window_html": `<div><h5>🏥 Hospital</h5><p>🪧 ${data.features[0].properties.name}</p></div>`,
              // "marker_html": `<img height="48" width="48" alt="Logo" src="assets/hospital.png" />`
              "marker_html": `<img height="48" width="48" alt="Logo" src="assets/hospital-5c6aedbe28e0c16d74f0d93df74f9152a202a3ae3502dd52cf57679886768adf.png" />`
            };

            let hospital_longitude = data.features[0].geometry.coordinates[0]
            let hospital_latitude = data.features[0].geometry.coordinates[1]

          this.#addHospitalsToMap(coordinates);
          if (getSafe === 1) {
            this.getSafe(hospital_longitude, hospital_latitude)
          }

          return coordinates;
        });
      }, 500)
    }

    async getSafe(hospital_longitude, hospital_latitude) {
      // console.log("Running getSafe()");
      // console.log(hospital_longitude, hospital_latitude);
      this.getCoords()

      setTimeout(() => {
        const { longitude, latitude } = this.coords;

        const base_url = "https://api.mapbox.com/directions/v5/mapbox/walking/"
        const url = `${base_url}${[longitude]},${[latitude]};${hospital_longitude},${hospital_latitude}?steps=true&geometries=geojson&access_token=${this.token}`
        let steps = []
        let duration = 0;
        let geojson = {}
        fetch(url)
          .then(response => response.json())
          .then((data) => {
            let route = data.routes[0].geometry.coordinates
            steps = data.routes[0].legs[0].steps;
            geojson = {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            }
            duration = data.routes[0].duration;

            this.map.fitBounds([
              [longitude, latitude], // southwestern corner of the bounds
              [hospital_longitude, hospital_latitude] // northeastern corner of the bounds
            ], {
              padding: 75 // padding in pixels
            });

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

              const instructions = document.getElementById('instructions');

              let tripInstructions = '';
              steps.forEach((step) => {
                tripInstructions += `<li>${step.maneuver.instruction}</li>`;
              })
              instructions.innerHTML = `<h5><strong>Trip duration: ${Math.floor(
                duration / 60
              )} min 🚶‍♀️ </strong></h5><ol>${tripInstructions}</ol>`;

            this.map.on('load', () => {
              // console.log(geojson);

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
            });
          })
      }, 500)
    }
  }
