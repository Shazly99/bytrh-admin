import React, { useContext, useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
  CurrentLocationButton
} from '@react-google-maps/api';
import { VendersContext } from '../context/Store';
import { Button } from 'react-bootstrap';
import LogoSvg from '../assets/svg/LogoSvg';
const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

function MapModal() {
  let { userLocationMap ,setLoctionMap } = useContext(VendersContext);

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // Add state for current location

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDaOQ1qVIyrLaSM819j3CxVv8OYLgJiYg4',
    libraries,
  });

  const handleMapClick = event => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newMarker = { lat, lng };
    setMarkers([newMarker]);
    setSelectedMarker(newMarker);
    setLoctionMap(newMarker); 

  };

  const handleMarkerClick = marker => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleCurrentLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newMarker = { lat: latitude, lng: longitude };
        setMarkers([newMarker]);
        setSelectedMarker(newMarker);
        setCurrentLocation(newMarker); // Set current location state
        setLoctionMap(newMarker); 

      },
      error => {
        console.error(error);
      }
    );
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={currentLocation || { lat: 23.8859, lng: 45.0792 }} // Use current location if available
      onClick={handleMapClick}
    >
      <div style={{ position: 'absolute', top: '80px', right: '10px', zIndex: 1 }}>

        <Button className='currentLocation__btn'  onClick={handleCurrentLocationClick}>
          <LogoSvg.CurrentLocation/>
        </Button>
      </div>
      {currentLocation && ( // Add marker for current location
        <Marker position={currentLocation}   />
      )}

      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}
      {/* {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.lat,
            lng: selectedMarker.lng,
          }}
          onCloseClick={handleInfoWindowClose}
        >
          <div>
            <p>Latitude: {selectedMarker.lat}</p>
            <p>Longitude: {selectedMarker.lng}</p>
          </div>
        </InfoWindow>
      )} */}
      
    </GoogleMap>
  );
}

export default MapModal;
/**
 * import React, { useContext, useState, useCallback } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';
import { VendersContext } from '../context/Store';
import { Autocomplete } from 'react-google-autocomplete';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

function MapModal() {
  let { userLocationMap ,setLoctionMap } = useContext(VendersContext);

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 23.8859, lng: 45.0792 });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_API_KEY',
    libraries,
  });

  const handleMapClick = event => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newMarker = { lat, lng };
    setMarkers([ newMarker]);
    setSelectedMarker(newMarker);
    setLoctionMap(newMarker); 
  };

  const handleMarkerClick = marker => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const onPlaceSelected = useCallback((place) => {
    const { lat, lng } = place.geometry.location;
    setCenter({ lat: lat(), lng: lng() });
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <Autocomplete
        onLoad={autocomplete => console.log('autocomplete: ', autocomplete)}
        onPlaceChanged={() => onPlaceSelected(autocomplete.getPlace())}
      >
        <input type="text" placeholder="Search Places..." />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.lat,
              lng: selectedMarker.lng,
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <p>Latitude: {selectedMarker.lat}</p>
              <p>Longitude: {selectedMarker.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default MapModal;

 */