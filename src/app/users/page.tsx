// src/app/users/page.tsx
import React from "react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // no cache so you always get fresh data
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 border rounded hover:shadow-md transition-shadow"
          >
            <Link href={`/users/${user.id}`} className="block">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">@{user.username}</p>
              <p className="text-gray-500">{user.email}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
