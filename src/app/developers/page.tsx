'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { getUsers } from '@/lib/api';
import type { User } from '@/lib/api';

function DeveloperCard({ developer }: { developer: User }) {
  return (
    <div className="p-6 rounded-xl bg-card border transition-all hover:shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xl font-semibold text-primary">
            {developer.name.charAt(0)}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            <Link href={`/developers/${developer.id}`} className="hover:text-primary">
              {developer.name}
            </Link>
          </h2>
          <p className="text-sm text-muted-foreground">@{developer.username}</p>
        </div>
      </div>
    </div>
  );
}

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setDevelopers);
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Developer Directory</h1>
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search developers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev) => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}
        </div>
      </div>
    </div>
  );
}
