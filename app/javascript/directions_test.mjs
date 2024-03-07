// import mapboxgl from 'mapbox-gl'
import fetch from 'node-fetch';

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
