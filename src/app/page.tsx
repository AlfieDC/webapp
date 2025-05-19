

import { FiUsers, FiMessageSquare, FiFileText } from 'react-icons/fi';
import { ReactNode } from 'react';
import { getStats } from '@/lib/api';
import Link from 'next/link';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
}

export default async function Home() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Welcome to FoodieConnect
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join a vibrant community of food lovers! Share recipes, food experiences, and restaurant reviews. Connect, inspire, and discover new tastes from around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Explore FoodieConnect</h2>
        <div className="flex justify-center gap-4 mb-12">
         <Link
            href="/users"
            className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
          >
             FOODIES
           </Link>

          <Link href="/posts">
            <button className="px-6 py-2 rounded-lg bg-secondary text-primary font-semibold hover:bg-secondary/80 transition">
              POSTS
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Our Foodie Community"
            description="Discover and connect with food lovers from all over the globe. See what inspires their culinary journeys."
            link="/users"
          />
          <FeatureCard
            title="Recipe & Review Board"
            description="Share your favorite recipes, food experiences, or restaurant reviews. Get inspired by others!"
            link="/posts"
          />
          <FeatureCard
            title="Foodie Stats Dashboard"
            description="Visualize community activity and diversity with interactive charts and a global map."
            link="/dashboard"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Dashboard</h2>
        {(() => {
          const max = Math.max(stats.users, stats.posts, stats.comments);
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard
                icon={<FiUsers className="w-8 h-8" />}
                title="Active Foodies"
                value={stats.users.toString()}
                max={max}
                color="from-blue-400 to-blue-600"
              />
              <StatCard
                icon={<FiFileText className="w-8 h-8" />}
                title="Total Posts"
                value={stats.posts.toString()}
                max={max}
                color="from-cyan-400 to-cyan-600"
              />
              <StatCard
                icon={<FiMessageSquare className="w-8 h-8" />}
                title="Comments"
                value={stats.comments.toString()}
                max={max}
                color="from-indigo-400 to-indigo-600"
              />
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, max, color }: StatCardProps & { max: number; color: string }) {
  const barHeight = ((parseInt(value) / max) * 100) || 10;

  return (
    <div className="p-6 rounded-xl bg-card border transition-all hover:shadow-lg flex flex-col justify-between h-full">
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-primary">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div
          className={`w-10 rounded-t-full bg-gradient-to-t ${color} shadow-lg relative flex items-end transition-all`}
          style={{
            height: `${barHeight + 30}px`,
            boxShadow: '0 4px 24px 0 rgba(59,130,246,0.15)',
            overflow: 'hidden',
          }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-9 h-4 bg-blue-300/70 blur-md rounded-full z-10" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, link }: FeatureCardProps) {
  return (
    <a
      href={link}
      className="block p-6 rounded-xl bg-card border transition-all hover:shadow-lg hover:border-primary/50"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </a>
  );
}

function BarGraph({ stats }: { stats: { users: number; posts: number; comments: number } }) {
  const max = Math.max(stats.users, stats.posts, stats.comments);

  const bars = [
    { label: 'Foodies', value: stats.users, color: 'from-blue-400 to-blue-600' },
    { label: 'Posts', value: stats.posts, color: 'from-cyan-400 to-cyan-600' },
    { label: 'Comments', value: stats.comments, color: 'from-indigo-400 to-indigo-600' },
  ];

  return (
    <div className="flex justify-center items-end gap-8 h-56 mt-12">
      {bars.map((bar) => (
        <div key={bar.label} className="flex flex-col items-center">
          <div
            className={`
              w-16
              rounded-t-full
              bg-gradient-to-t ${bar.color}
              shadow-lg
              relative
              flex items-end
              transition-all
            `}
            style={{
              height: `${(bar.value / max) * 180 + 40}px`,
              boxShadow: '0 4px 24px 0 rgba(59,130,246,0.15)',
              overflow: 'hidden',
            }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-14 h-7 bg-blue-300/70 blur-md rounded-full z-10" />
            <span className="absolute w-full text-center text-white font-bold text-lg z-20" style={{ top: 12 }}>
              {bar.value}
            </span>
          </div>
          <span className="mt-4 text-sm font-medium text-muted-foreground">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}
