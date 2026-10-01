"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalProjects: number;
  totalServices: number;
  totalTeam: number;
  totalTestimonials: number;
  totalMessages: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalServices: 0,
    totalTeam: 0,
    totalTestimonials: 0,
    totalMessages: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const res = await fetch("/api/dashboard");
    const data = await res.json();

    if (data.success) {
      setStats(data.stats);
    }
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-[#0B2341]">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to BuildDom Admin Panel
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="text-gray-500">Projects</h2>

          <p className="text-4xl font-bold mt-3 text-[#F58220]">
            {stats.totalProjects}
          </p>
        </div>

        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="text-gray-500">
            Services
          </h2>

          <p className="text-4xl font-bold mt-3 text-[#F58220]">
            {stats.totalServices}
          </p>
        </div>

        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="text-gray-500">
            Team
          </h2>

          <p className="text-4xl font-bold mt-3 text-[#F58220]">
            {stats.totalTeam}
          </p>
        </div>

        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="text-gray-500">
            Testimonials
          </h2>

          <p className="text-4xl font-bold mt-3 text-[#F58220]">
            {stats.totalTestimonials}
          </p>
        </div>

        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="text-gray-500">
            Messages
          </h2>

          <p className="text-4xl font-bold mt-3 text-[#F58220]">
            {stats.totalMessages}
          </p>
        </div>

      </div>
            <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="mb-4 text-2xl font-bold text-[#0B2341]">
            Quick Actions
          </h2>

          <div className="grid gap-4">

            <a
              href="/admin/projects"
              className="rounded-lg bg-[#F58220] p-4 text-white transition hover:bg-orange-600"
            >
              📦 Manage Projects
            </a>

            <a
              href="/admin/services"
              className="rounded-lg bg-[#0B2341] p-4 text-white transition hover:bg-blue-900"
            >
              🛠 Manage Services
            </a>

            <a
              href="/admin/team"
              className="rounded-lg bg-[#F58220] p-4 text-white transition hover:bg-orange-600"
            >
              👥 Manage Team
            </a>

            <a
              href="/admin/testimonials"
              className="rounded-lg bg-[#0B2341] p-4 text-white transition hover:bg-blue-900"
            >
              ⭐ Manage Testimonials
            </a>

            <a
              href="/admin/messages"
              className="rounded-lg bg-[#F58220] p-4 text-white transition hover:bg-orange-600"
            >
              📨 View Messages
            </a>

          </div>
        </div>

        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="mb-4 text-2xl font-bold text-[#0B2341]">
            Website Overview
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-2">
              <span>Total Projects</span>
              <strong>{stats.totalProjects}</strong>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Total Services</span>
              <strong>{stats.totalServices}</strong>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Team Members</span>
              <strong>{stats.totalTeam}</strong>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Testimonials</span>
              <strong>{stats.totalTestimonials}</strong>
            </div>

            <div className="flex justify-between">
              <span>Contact Messages</span>
              <strong>{stats.totalMessages}</strong>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}