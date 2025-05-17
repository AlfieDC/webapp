'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

interface CommunityGrowthChartProps {
  users: number;
  posts: number;
  comments: number;
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function CommunityGrowthChart({ users, posts, comments }: CommunityGrowthChartProps) {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    theme: { mode: 'light' },
    colors: ['#6366f1', '#22c55e'],
    grid: { borderColor: '#e5e7eb' },
  };

  const chartSeries = [
    {
      name: 'Users',
      data: [10, 20, 30, 40, 50, users],
    },
    {
      name: 'Posts',
      data: [15, 25, 35, 45, 55, posts],
    },
    {
      name: 'Comments',
      data: [20, 30, 40, 50, 60, comments],
    },
  ];

  return (
    <div className="bg-card border rounded-xl p-6">
      <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
}