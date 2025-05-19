'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Button
        variant="outline"
        onClick={() => router.push('/')}
        className="mb-6"
      >
        ← Back to Home
      </Button>

      <h1 className="text-3xl font-semibold mb-8">All Posts</h1>

      {loading && <p className="text-gray-500">Loading posts...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-500">No posts found.</p>
      )}

      <ul className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </ul>
    </main>
  );
}
