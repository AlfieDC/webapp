'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FiUser, FiMail, FiPhone, FiGlobe, FiMapPin
} from 'react-icons/fi';
import {
  GoogleMap, LoadScript, Marker, InfoWindow
} from '@react-google-maps/api';

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
  const [isOpen, setIsOpen] = useState(false);

  const center = useMemo(() => ({
    lat: parseFloat(address.geo.lat),
    lng: parseFloat(address.geo.lng),
  }), [address.geo.lat, address.geo.lng]);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(12);
  }, [center]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '200px' }}
        center={center}
        zoom={12}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
        }}
        onLoad={onLoad}
      >
        <Marker position={center} onClick={() => setIsOpen(true)}>
          {isOpen && (
            <InfoWindow position={center} onCloseClick={() => setIsOpen(false)}>
              <div>
                <p>{address.street}, {address.suite}</p>
                <p>{address.city}, {address.zipcode}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </LoadScript>
  );
}

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        ]);

        if (!userRes.ok || !postsRes.ok) throw new Error('Failed to fetch');

        const userData = await userRes.json();
        const postsData = await postsRes.json();

        setUser(userData);
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error || !user) return (
    <div className="p-6 text-red-500">
      {error || 'User not found'}
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="p-6 bg-card border rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <FiUser className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex gap-2 items-center mb-2"><FiMail /><a href={`mailto:${user.email}`}>{user.email}</a></div>
                  <div className="flex gap-2 items-center mb-2"><FiPhone /><span>{user.phone}</span></div>
                  <div className="flex gap-2 items-center"><FiGlobe /><a href={`https://${user.website}`} target="_blank">{user.website}</a></div>
                </div>
                <div>
                  <p><strong>Company:</strong> {user.company.name}</p>
                  <p className="text-muted-foreground text-sm">{user.company.catchPhrase}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-card border rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="mb-4 flex gap-2 items-start">
              <FiMapPin className="text-primary mt-1" />
              <div>
                <p>{user.address.street}, {user.address.suite}</p>
                <p>{user.address.city}, {user.address.zipcode}</p>
              </div>
            </div>
            <Map address={user.address} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="p-4 border rounded-xl bg-card">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

