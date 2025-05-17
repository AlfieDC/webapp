import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

// Define the User type based on JSONPlaceholder
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

async function getUser(id: string): Promise<User | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

interface Props {
  params: { id: string };
}

export default async function UserDetailPage({ params }: Props) {
  const user = await getUser(params.id);

  if (!user) notFound();

  // Create a Google Maps Embed URL using user's coordinates
  const { lat, lng } = user.address.geo;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/users" className="text-blue-600 hover:underline block mb-4">
        ← Back to Users
      </Link>

      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="mb-1"><strong>Username:</strong> {user.username}</p>
      <p className="mb-1"><strong>Email:</strong> {user.email}</p>
      <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
      <p className="mb-4"><strong>Website:</strong> {user.website}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Address</h2>
      <p className="mb-2">
        {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
      </p>

      {/* Embed Google Maps */}
      <div className="mt-4 border rounded overflow-hidden shadow-lg h-[400px]">
        <iframe
          title="User Location Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src={mapSrc}
        ></iframe>
      </div>
    </div>
  );
}
