"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  featured: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await fetch("/api/public/projects");
      const data = await res.json();

      if (data.success) {
        // Show featured projects first
        const sortedProjects = [...data.projects].sort(
          (a: Project, b: Project) =>
            Number(b.featured) - Number(a.featured)
        );

        setProjects(sortedProjects);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-[#071A31] to-[#0B2341] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.35em] text-[#F58220]">
            Featured Projects
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-white lg:text-5xl">
            Our Latest Works
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Every project reflects our commitment to engineering excellence,
            innovative construction practices, and long-term client
            satisfaction.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {/* Loading */}
          {loading ? (
            <div className="col-span-full flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#F58220]" />
            </div>
          ) : projects.length === 0 ? (

            /* Empty State */
            <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 py-16 text-center">
              <p className="text-xl font-semibold text-white">
                No projects available yet.
              </p>

              <p className="mt-2 text-gray-400">
                Our latest projects will appear here soon.
              </p>
            </div>

          ) : (

            projects.map((project) => (
              <div
                key={project._id}
                className="group overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">

                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A31]/90 via-[#071A31]/20 to-transparent" />

                  {/* Category */}
                  <div className="absolute left-5 top-5 rounded-full bg-[#F58220] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    {project.category}
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0B2341] shadow-lg">
                      Featured
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="absolute bottom-0 w-full p-6">

                    <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#F58220]">
                      {project.title}
                    </h3>

                    {project.location && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-200">
                        <MapPin size={16} className="text-[#F58220]" />
                        {project.location}
                      </div>
                    )}

                    <button className="mt-4 inline-flex items-center gap-2 font-semibold text-[#F58220] transition-all duration-300 group-hover:gap-4">
                      View Project
                      <ArrowRight size={18} />
                    </button>

                  </div>
                </div>

                {/* Description */}
                {project.description && (
                  <div className="p-6">
                    <p className="line-clamp-2 leading-7 text-gray-600">
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
            ))

          )}

        </div>

        {/* View All */}
        {!loading && projects.length > 0 && (
          <div className="mt-16 text-center">
            <button className="rounded-2xl bg-[#F58220] px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30">
              View All Projects
            </button>
          </div>
        )}

      </div>
    </section>
  );
}