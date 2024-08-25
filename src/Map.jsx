import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const TomTomMap = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const map = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: mapElement.current,
      center: [0, 0],
      zoom: 2,
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapElement} style={{ height: '100%', width: '100%' }} />;
};

export default TomTomMap;