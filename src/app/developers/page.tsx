import { FiSearch } from 'react-icons/fi';
import { getUsers } from '@/lib/api';
import type { User } from '@/lib/api';

export default async function DevelopersPage() {
  const developers = await getUsers();

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
          {developers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DeveloperCard({ developer }: { developer: User }) {
  return (
    <div className="p-6 rounded-xl bg-card border transition-all hover:shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xl font-semibold text-primary">
            {developer.name.charAt(0)}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            <a href={`/developers/${developer.id}`} className="hover:text-primary">
              {developer.name}
            </a>
          </h2>
          <p className="text-sm text-muted-foreground">@{developer.username}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p className="text-muted-foreground">
          <strong>Company:</strong> {developer.company.name}
        </p>
        <p className="text-muted-foreground">
          <strong>Location:</strong> {developer.address.city}
        </p>
        <p className="text-muted-foreground">
          <strong>Website:</strong>{' '}
          <a
            href={`https://${developer.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            {developer.website}
          </a>
        </p>
      </div>

      <div className="mt-4 pt-4 border-t">
        <a
          href={`/developers/${developer.id}`}
          className="text-sm text-primary hover:underline"
        >
          View Profile →
        </a>
      </div>
    </div>
  );
} 