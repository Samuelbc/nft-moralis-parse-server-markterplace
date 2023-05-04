
import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Rectangle } from '@react-google-maps/api';



const containerStyle = {
    marginLeft: '300px',
    width: '400px',
    height: '400px'
  };

const center = {
  lat: -21.175394,
  lng: -47.787250
};
  
const bounds = {
    north: -21.175394,
    south: -21.173394,
    east: -47.787250,
    west: -47.791250
  };

// const onLoad = rectangle => {
//     console.log('rectangle: ', rectangle)
//   }; 

const MapExample = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        || "AIzaSyA6yl3RuNim03BeIFmVm_s9oOnxeq-8cLI"});

    return (
        <div className='map'>
            { isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
            >
                <Rectangle
                    bounds={bounds}
                />
            </GoogleMap>
            ) : (
            <></>
            )}
        </div>);
}   

export default MapExample