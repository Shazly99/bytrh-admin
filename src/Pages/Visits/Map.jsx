import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import React, { useMemo } from 'react';
import './visit.scss';

const Map = (
    DoctorLat,
    DoctorLong,
    VisitLat,
    VisitLong) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDaOQ1qVIyrLaSM819j3CxVv8OYLgJiYg4',
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <GoogleMaps
        DoctorLat={DoctorLat}
        DoctorLong={DoctorLong}
        VisitLat={VisitLat}
        VisitLong={VisitLong}
    />;
}

export default Map

function GoogleMaps(
    DoctorLat,
    DoctorLong,
    VisitLat,
    VisitLong
) {

    const center = useMemo(() => ({ lat:VisitLat, lng: VisitLong }), []);

    // const startPoint = { lat: parseFloat('24.83275'), lng: parseFloat('39.7212279') };
    const endPoint = { lat: DoctorLat, lng:DoctorLong };
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
                <Marker position={endPoint} clickable={true} /> //shazloka
                <Polyline path={[center, endPoint]} options={lineOptions} />
                <Marker position={center} clickable={true} />
            </GoogleMap>
        </div>
    );
}