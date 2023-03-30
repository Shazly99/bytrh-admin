import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from 'react-google-maps'; 
function Map({ VisitLat, VisitLong, DoctorLat, DoctorLong }) {
  const [markers, setMarkers] = useState([]);
  const [startPoint, setStartPoint] = useState({ lat: DoctorLat, lng: DoctorLong });
  const [endPoint, setEndPoint] = useState({ lat: VisitLat, lng: VisitLong });
  const [path, setPath] = useState([]);

  useEffect(() => {
    setMarkers([startPoint, endPoint]);
    console.log(endPoint);
  }, [startPoint, endPoint]);
  useEffect(() => {
    setStartPoint({ lat: DoctorLat, lng: DoctorLong })
    setEndPoint({ lat: VisitLat, lng: VisitLong })
  }, [DoctorLat, DoctorLong, VisitLat, VisitLong]);




  function handleMarkerClick(marker) {
    console.log(marker);
  }

  function handlePathUpdate(newPath) {
    setPath(newPath);
  }
  const waveSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4,
  };

  // ..
  const MapComponent = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: DoctorLat, lng: DoctorLong }}
      onClick={props.onMapClick}
    >
      {props.children}
      <Polyline path={path}
        options={{
          strokeColor: '#FF0000',
          geodesic: true, 
          strokeOpacity: 0.7
        }} />
    </GoogleMap>
  ));
  useEffect(() => {
    setMarkers([startPoint, endPoint]);
    setPath([startPoint, endPoint]);
  }, [startPoint, endPoint]);
  return (
    <div>
      <MapComponent
        containerElement={<div style={{ height: '500px' }} />}
        mapElement={<div style={{ height: '100%' }} />}

      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
            icon={{
              url: `https://maps.google.com/mapfiles/ms/icons/${index === 0 ? 'red' : 'green'}-dot.png`,
              // scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}
      </MapComponent>
    </div>
  );
}

export default Map;
