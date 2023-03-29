import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import React, { useMemo } from 'react';
import './visit.scss';

const Map = ( ) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDaOQ1qVIyrLaSM819j3CxVv8OYLgJiYg4',
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <GoogleMaps />;
}

export default Map

function GoogleMaps() {

    const center = useMemo(() => ({ lat: parseFloat('24.83275'), lng: parseFloat('46.681139') }), []);

    // const startPoint = { lat: parseFloat('24.83275'), lng: parseFloat('39.7212279') };
    const endPoint = { lat: parseFloat('24.832493  '), lng: parseFloat(' 46.681228') };
    const lineOptions = {
        strokeColor: "red", // Set the line color
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        zIndex: 1,
    };
    return (
        <div className="map">
            <GoogleMap zoom={20} center={center} mapContainerClassName="map-container">
                <Marker position={endPoint} clickable={true} /> 
                <Polyline path={[center, endPoint]} options={lineOptions} />
                <Marker position={center} clickable={true} />  
            </GoogleMap>
        </div>
    );
}