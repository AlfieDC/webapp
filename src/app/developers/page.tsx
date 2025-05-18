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

export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser ] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser  = async () => {
      try {
        const userData = await getUsers(); // Adjust this line to fetch the specific user by ID if needed
        setUser (userData);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser ();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Render user profile details here */}
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
}
