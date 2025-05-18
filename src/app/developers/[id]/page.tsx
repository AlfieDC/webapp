'use client';

import { useEffect, useState } from 'react';
import { FiMail, FiGlobe, FiMapPin, FiPhone, FiUser, FiMessageSquare } from 'react-icons/fi';
import Link from 'next/link';

// Import your loading skeleton (make sure this file exists or adjust path accordingly)
import UserProfileSkeleton from '@/components/UserProfileSkeleton'; // Adjust the path if needed

type User = {
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
};

type Post = {
  id: number;
  title: string;
  body: string;
};

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
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            <FiUser className="mr-2" /> {user.name}
          </h1>
          <p className="mb-2 flex items-center"><FiMail className="mr-2" /> {user.email}</p>
          <p className="mb-2 flex items-center"><FiPhone className="mr-2" /> {user.phone}</p>
          <p className="mb-2 flex items-center"><FiGlobe className="mr-2" /> {user.website}</p>
          <p className="mb-2 flex items-center">
            <FiMapPin className="mr-2" />
            {user.address.street}, {user.address.city}, {user.address.zipcode}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FiMessageSquare className="mr-2" /> Posts
          </h2>
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="bg-white p-4 shadow rounded">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-gray-600">{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

