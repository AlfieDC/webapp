'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;

  if (!post) return <div>Post not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-6">{post.body}</p>

      <Link href="/posts" className="text-blue-600 hover:underline">
        ← Back to Posts
      </Link>
    </div>
  );
}

