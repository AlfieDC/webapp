'use client';

import { FiSearch } from 'react-icons/fi';
import { getUsers } from '@/lib/api';
import type { User } from '@/lib/api';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { FiMail, FiGlobe, FiMapPin, FiPhone, FiUser , FiMessageSquare } from 'react-icons/fi';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Link from 'next/link';

const mapContainerStyle = {
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

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function Map({ address }: { address: User['address'] }) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const center = useMemo(() => ({
    lat: parseFloat(address.geo.lat),
    lng: parseFloat(address.geo.lng),
  }), [address.geo.lat, address.geo.lng]);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(12);
  }, [center]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Developer Directory</h1>
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search developers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            options={mapOptions}
            onLoad={onLoad}
          >
            <Marker position={center} onClick={() => setIsInfoWindowOpen(true)}>
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
            </Marker>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser ] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser And
