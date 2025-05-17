'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FiUsers, FiMessageSquare, FiFileText, FiTrendingUp } from 'react-icons/fi';
import { ApexOptions } from 'apexcharts';

// Import ApexCharts on client side only
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Stats {
  users: number;
  posts: number;
  comments: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    posts: 0,
    comments: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json()),
    ]).then(([users, posts, comments]) => {
      setStats({
        users: users.length,
        posts: posts.length,
        comments: comments.length,
      });
    });
  }, []);

  const lineChartOptions: ApexOptions = {
    chart: {
      type: 'line' as const,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    theme: {
      mode: 'light',
    },
    colors: ['#6366f1', '#22c55e'],
    grid: {
      borderColor: '#e5e7eb',
    },
  };

  const lineChartSeries = [
    {
      name: 'New Users',
      data: [30, 40, 35, 50, 49, 60],
    },
    {
      name: 'Active Users',
      data: [20, 35, 40, 45, 55, 65],
    },
  ];

  const pieChartOptions: ApexOptions = {
    chart: {
      type: 'donut' as const,
    },
    labels: ['Posts', 'Comments', 'Users'],
    theme: {
      mode: 'light',
    },
    legend: {
      position: 'bottom',
    },
    colors: ['#6366f1', '#22c55e', '#3b82f6'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
  };

  const pieChartSeries = [stats.posts, stats.comments, stats.users];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Community Dashboard</h1>
            {/* Add buttons below the heading */}
            <div className="mt-4 flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">USERS</button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-primary font-semibold hover:bg-secondary/80 transition">POSTS</button>
            </div>
          </div>
          <select className="p-2 rounded-lg bg-card border border-input focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<FiUsers className="w-6 h-6" />}
            title="Total Users"
            value={stats.users}
            trend="+12%"
          />
          <StatCard
            icon={<FiFileText className="w-6 h-6" />}
            title="Total Posts"
            value={stats.posts}
            trend="+8%"
          />
          <StatCard
            icon={<FiMessageSquare className="w-6 h-6" />}
            title="Total Comments"
            value={stats.comments}
            trend="+15%"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Chart */}
          <div className="p-6 rounded-xl bg-card border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Community Growth</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm rounded-md bg-primary/10 text-primary">Daily</button>
                <button className="px-3 py-1 text-sm rounded-md hover:bg-primary/10">Weekly</button>
                <button className="px-3 py-1 text-sm rounded-md hover:bg-primary/10">Monthly</button>
              </div>
            </div>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={350}
            />
          </div>

          {/* Distribution Chart */}
          <div className="p-6 rounded-xl bg-card border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Content Distribution</h2>
              <button className="text-sm text-primary hover:underline">View Details</button>
            </div>
            <Chart
              options={pieChartOptions}
              series={pieChartSeries}
              type="donut"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  trend: string;
}

function StatCard({ icon, title, value, trend }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl bg-card border">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <div className="text-primary">{icon}</div>
        </div>
        <div className="flex items-center text-sm text-green-500">
          <FiTrendingUp className="mr-1" />
          {trend}
        </div>
      </div>
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}