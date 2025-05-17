'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  { emoji: '🍜', name: 'Noodles' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🍔', name: 'Burger' },
  { emoji: '🍰', name: 'Dessert' },
  { emoji: '🥗', name: 'Salad' },
  { emoji: '🍣', name: 'Sushi' },
];

export default function NewPostPage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState(categories[0].name);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      setError('Title and body are required.');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      body,
      category,
      userId: currentUser?.id,
      createdAt: new Date().toISOString(),
    };

    const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    localStorage.setItem('userPosts', JSON.stringify([newPost, ...existingPosts]));

    router.push('/posts');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">📝 Create a New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              placeholder="Write your review..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <select
              className="w-full border rounded-lg p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>

            {error && <p className="text-red-600">{error}</p>}

            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
              Publish Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
