'use client';

import { useState, useMemo, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '200px',
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

export default function Map({ address }: { address: any }) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const center = useMemo(() => ({
    lat: parseFloat(address.geo.lat),
    lng: parseFloat(address.geo.lng),
  }), [address]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(12);
  }, [center]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={mapOptions}
      onLoad={onLoad}
    >
      <Marker position={center} onClick={() => setIsInfoWindowOpen(true)} />
      {isInfoWindowOpen && (
        <InfoWindow position={center} onCloseClick={() => setIsInfoWindowOpen(false)}>
          <div className="p-2">
            <p className="font-medium">{address.street}, {address.suite}</p>
            <p className="text-sm">{address.city}, {address.zipcode}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-700 mt-2 inline-block"
            >
              Open in Google Maps
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
