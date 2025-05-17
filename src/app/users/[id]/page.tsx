import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

// Sample categories
const categories = [
  { emoji: "🍜", name: "Noodles" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🍔", name: "Burger" },
  { emoji: "🍰", name: "Dessert" },
  { emoji: "🥗", name: "Salad" },
  { emoji: "🍣", name: "Sushi" },
];

function getRandomCategory(postId: number) {
  return categories[postId % categories.length];
}

// Types
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
  userId: number;
  title: string;
  body: string;
};

// Fetch single user
async function getUser(id: string): Promise<User | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

// Fetch all posts
async function getPosts(): Promise<Post[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

interface Props {
  params: { id: string };
}

export default async function UserDetailPage({ params }: Props) {
  const user = await getUser(params.id);
  const posts = await getPosts();

  if (!user) notFound();

  const userPosts = posts.filter((post) => post.userId === user.id);
  const { lat, lng } = user.address.geo;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/users" className="text-blue-600 hover:underline block mb-4">
        ← Back to Users
      </Link>

      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <div className="space-y-1 text-gray-800">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Address</h2>
      <p>
        {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
      </p>

      {/* Google Maps */}
      <div className="mt-4 border rounded overflow-hidden shadow-md h-[400px]">
        <iframe
          title={`${user.name} Location`}
          src={mapSrc}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Posts */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Posts by {user.name}</h2>
      {userPosts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-6">
          {userPosts.map((post) => {
            const category = getRandomCategory(post.id);
            const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0–5.0

            return (
              <li
                key={post.id}
                className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <img
                  src={`https://source.unsplash.com/600x400/?food&sig=${post.id}`}
                  alt={`Food image for post ${post.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-sm text-pink-500 font-medium block mb-1">
                      {category.emoji} {category.name}
                    </span>
                    <h3 className="text-xl font-semibold text-pink-600 mb-2">
                      🍽️ {post.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{post.body.slice(0, 120)}...</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-sm bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
                    >
                      Read Full Review
                    </Link>
                    <span className="text-sm font-semibold bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full">
                      ★ {rating}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
