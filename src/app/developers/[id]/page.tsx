import { useEffect, useState, useMemo, useCallback } from 'react';
import { FiMail, FiGlobe, FiMapPin, FiPhone, FiUser , FiMessageSquare } from 'react-icons/fi';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Link from 'next/link'; // Import Link from next/link

export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser ] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser AndPosts = async () => {  
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

        setUser (userData);
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser AndPosts();  
  }, [params.id]);

  if (loading) {
    return <User ProfileSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-muted-foreground">{error || 'User  not found'}</p>
            <Link href="/developers">
              <a className="text-primary hover:underline mt-4 inline-block">Back to Developers</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
