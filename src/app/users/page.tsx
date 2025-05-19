import Link from "next/link";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Our Foodies</h1>
        <Link href="/">
          <span className="text-sm text-gray-600 hover:text-black border border-gray-300 rounded-full px-4 py-2 transition duration-200">
            ⬅ Home
          </span>
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <li
            key={user.id}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition"
          >
            <Link href={`/users/${user.id}`}>
              <div className="space-y-1">
                <h2 className="text-lg font-medium text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
