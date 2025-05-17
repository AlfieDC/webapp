// src/app/posts/page.tsx
import React from "react";
import Link from "next/link";
import { FiMessageCircle, FiUser, FiSearch, FiFilter } from 'react-icons/fi';
import { getPosts, getUser } from '@/lib/api';
import type { Post } from '@/lib/api';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold">Knowledge Sharing</h1>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            New Post
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-input hover:bg-card transition-colors flex items-center gap-2">
              <FiFilter className="text-primary" />
              <span>Filter</span>
            </button>
            <select className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-card transition-colors">
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="comments">Most Comments</option>
            </select>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function PostCard({ post }: { post: Post }) {
  const author = await getUser(post.userId);

  return (
    <article className="p-6 rounded-xl bg-card border transition-all hover:shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-lg font-semibold text-primary">
            {author.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium">
            <a href={`/developers/${author.id}`} className="hover:text-primary">
              {author.name}
            </a>
          </p>
          <p className="text-xs text-muted-foreground">@{author.username}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2 capitalize">
        <a href={`/posts/${post.id}`} className="hover:text-primary">
          {post.title}
        </a>
      </h2>
      <p className="text-muted-foreground mb-4">
        {post.body.length > 200 ? `${post.body.substring(0, 200)}...` : post.body}
      </p>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FiMessageCircle />
          <span>View Comments</span>
        </div>
        <a
          href={`/posts/${post.id}`}
          className="text-sm text-primary hover:underline"
        >
          Read More →
        </a>
      </div>
    </article>
  );
}
