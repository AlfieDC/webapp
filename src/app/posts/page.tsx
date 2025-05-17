// src/app/posts/page.tsx
import React from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-4 border rounded hover:shadow-md transition-shadow"
          >
            <Link href={`/posts/${post.id}`} className="block">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.body.substring(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
