import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import * as ttServices from '@tomtom-international/web-sdk-services';

const TomTomMap = ({ address }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const map = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: mapElement.current,
      center: [12.4964,41.9028], // Coordinate iniziali ( Roma)
      zoom: 3, // Zoom iniziale
    });

    const fetchCoordinates = async () => {
      try {
        const response = await ttServices.services.geocode({
          key: import.meta.env.VITE_TOMTOM_API_KEY,
          query: address,
        });

        console.log('Geocoding response:', response);
        const result = response.results[0];
        if (result && result.position) {
          const { lng, lat } = result.position;
          if (!isNaN(lng) && !isNaN(lat)) {
            map.setCenter([lng, lat]);
            map.setZoom(15);
            // new tt.Marker().setLngLat([lng, lat]).addTo(map);
          } else {
            console.error('Invalid coordinates:', lng, lat);
          }
        } else {
          console.error('No valid result found for the given address.');
        }
      } catch (error) {
        console.error('Error during geocoding:', error);
      }
    };

    if(address != null){
        fetchCoordinates();
    }
    

    return () => {
      map.remove();
    };
  }, [address]);

  

  return <div ref={mapElement} style={{ height: '100%', width: '100%' }} />;
};

export default TomTomMap;