import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="geolocation"
export default class extends Controller {

  // static targets = [ "input" ]

  connect() {
    console.log("Connected to geolocation controller")
    this.geolocate()
  }

  geolocate() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const coordinates = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${coordinates.latitude}`);
      console.log(`Longitude: ${coordinates.longitude}`);
      console.log(`More or less ${coordinates.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}
