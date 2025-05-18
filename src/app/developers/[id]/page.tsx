'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { FiMail, FiGlobe, FiMapPin, FiPhone, FiUser, FiMessageSquare } from 'react-icons/fi';
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

  const center = useMemo(
    () => ({
      lat: parseFloat(address.geo.lat),
      lng: parseFloat(address.geo.lng),
    }),
    [address.geo.lat, address.geo.lng]
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(12);
  }, [center]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
        onLoad={onLoad}
      >
        <Marker
          position={center}
          onClick={() => setIsInfoWindowOpen(true)}
        >
          {isInfoWindowOpen && (
            <InfoWindow
              position={center}
              onCloseClick={() => setIsInfoWindowOpen(false)}
            >
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
  );
}

export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`),
          fetch(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`)
        ]);

        if (!userRes.ok || !postsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const userData = await userRes.json();
        const postsData = await postsRes.json();

        setUser(userData);
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [params.id]);

  if (loading) {
    return <UserProfileSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-muted-foreground">{error || 'User not found'}</p>
            <Link href="/developers" className="text-primary hover:underline mt-4 inline-block">
              Back to Developers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        {/* User Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-xl bg-card border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FiUser className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FiMail className="text-primary" />
                    <a href={`mailto:${user.email}`} className="hover:text-primary">
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-primary" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiGlobe className="text-primary" />
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Company</h3>
                  <p className="text-muted-foreground">{user.company.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user.company.catchPhrase}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="p-6 rounded-xl bg-card border h-full">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="mb-4">
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-primary mt-1" />
                  <div>
                    <p>{user.address.street}, {user.address.suite}</p>
                    <p>{user.address.city}, {user.address.zipcode}</p>
                  </div>
                </div>
              </div>
              <div className="h-[200px] rounded-lg overflow-hidden">
                <Map address={user.address} />
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Posts by {user.name}</h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="p-6 rounded-xl bg-card border">
                <h3 className="text-xl font-semibold mb-2 capitalize">
                  <Link href={`/posts/${post.id}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  {post.body.length > 200 ? `${post.body.substring(0, 200)}...` : post.body}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FiMessageSquare />
                  <Link href={`/posts/${post.id}`} className="hover:text-primary">
                    View Comments
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UserProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-xl bg-card border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-8 w-48 bg-card animate-pulse rounded"></div>
                  <div className="h-4 w-32 bg-card animate-pulse rounded"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 bg-card animate-pulse rounded"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-card animate-pulse rounded"></div>
                  <div className="h-4 w-48 bg-card animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="p-6 rounded-xl bg-card border">
              <div className="h-6 w-32 bg-card animate-pulse rounded mb-4"></div>
              <div className="h-[200px] bg-card animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-xl bg-card border">
              <div className="h-6 w-3/4 bg-card animate-pulse rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-card animate-pulse rounded"></div>
                <div className="h-4 w-2/3 bg-card animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

\
