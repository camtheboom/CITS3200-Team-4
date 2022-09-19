const startTracking = () => {
  if(!navigator.geolocation) {
    logConsole.textContent = 'Geolocation is not supported by your browser';
  } else {
    logConsole.textContent = 'Locating ...';
    distanceBox.textContent = '0.000';

    return navigator.geolocation.watchPosition(success, error, trackOptions);
  }
}

const HIGH_ACCURACY = true;
const MAX_CACHE_AGE_MILLISECOND = 30000;
const MAX_NEW_POSITION_MILLISECOND = 5000;

const trackOptions = {
  enableHighAccuracy: HIGH_ACCURACY,
  maximumAge: MAX_CACHE_AGE_MILLISECOND,
  timeout: MAX_NEW_POSITION_MILLISECOND,
};

const LONDON_CENTRE_LAT_LNG = [51.505, -0.09];

let map = L.map("tracker").setView(LONDON_CENTRE_LAT_LNG, 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "YOUR_API_KEY",
  }
).addTo(map);

const updateMap = (event) => {

  ...

  drawNewSegment(event.detail)
    .then((detail) => drawNewMarker(detail))
    .then((detail) => refreshMeter(detail))
    
}

const drawNewSegment = (detail) => {
  
  const { latitude, longitude } = detail;

  return new Promise((resolve) => {
    if (path == null) {

      path = L.polyline([
        [ latitude, longitude ],
      ], {
        color: '#fbc531',
        bubblingMouseEvents: true
      }).addTo(map);

      map.setView([latitude, longitude], 15)
      map.fitBounds(path.getBounds());

    } else {

      if (isStart === true) {

        path._latlngs.push([latitude, longitude]);
        path.redraw();

      }
    }

    return resolve(detail);
  })
}


const refreshMeter = (detail) => {
  return new Promise((resolve) => {

    if (path == null) return resolve(detail);

    if (!isStart) return resolve(detail);

    const delta = calculateDelta(path._latlngs)
    accumulatedDistance += delta;

    const formattedDistance = (round(accumulatedDistance, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
    distanceBox.textContent = formattedDistance;
    report(`3. Updated path with ${delta} km | accumulatedDistance = ${formattedDistance}`);

    return resolve(detail);
  })
}