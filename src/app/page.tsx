'use client'

import { FiUsers, FiMessageSquare, FiFileText } from 'react-icons/fi';
import { ReactNode } from 'react';
import { getStats } from '@/lib/api';

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
          <a href="/users">
            <button className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">
              FOODIES
            </button>
          </a>
          <a href="/posts">
            <button className="px-6 py-2 rounded-lg bg-secondary text-primary font-semibold hover:bg-secondary/80 transition">
              POSTS
            </button>
          </a>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={<FiUsers className="w-8 h-8" />}
            title="Active Foodies"
            value={stats.users.toString()}
          />
          <StatCard
            icon={<FiFileText className="w-8 h-8" />}
            title="Total Posts"
            value={stats.posts.toString()}
          />
          <StatCard
            icon={<FiMessageSquare className="w-8 h-8" />}
            title="Comments"
            value={stats.comments.toString()}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl bg-card border transition-all hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="text-primary">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
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
