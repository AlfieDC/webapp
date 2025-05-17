"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatsPage() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);

      const users = await usersRes.json();
      const posts = await postsRes.json();
      const comments = await commentsRes.json();

      setUserCount(users.length);
      setPostCount(posts.length);
      setCommentCount(comments.length);
    }

    fetchCounts();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Users", "Posts", "Comments"],
    },
    dataLabels: {
      enabled: true,
    },
  };

  const series = [
    {
      name: "Count",
      data: [userCount, postCount, commentCount],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Visualization</h1>
      <Chart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  );
}
