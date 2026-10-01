"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  description: string;
}

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    try {
      const res = await fetch("/api/public/team");
      const data = await res.json();

      if (data.success) {
        setTeam(data.team);
      }
    } catch (error) {
      console.error("Failed to load team:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="team" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.35em] text-[#F58220]">
            Our Team
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-[#0B2341] lg:text-5xl">
            Meet Our Professionals
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Our experienced engineers, architects and project managers work
            together to deliver world-class construction solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {/* Loading */}
          {loading ? (
            <div className="col-span-full flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#F58220]" />
            </div>
          ) : team.length === 0 ? (

            /* Empty State */
            <div className="col-span-full rounded-3xl border border-gray-200 bg-[#F8FAFC] py-16 text-center">
              <User
                size={42}
                className="mx-auto text-[#F58220]"
              />

              <p className="mt-5 text-xl font-semibold text-[#0B2341]">
                No team members available yet.
              </p>

              <p className="mt-2 text-gray-500">
                Our professional team will be introduced here soon.
              </p>
            </div>

          ) : (

            team.map((member) => (
              <div
                key={member._id}
                className="group overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">

                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#071A31]">
                      <User
                        size={70}
                        className="text-white/30"
                      />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A31]/95 via-[#071A31]/30 to-transparent" />

                  {/* Information */}
                  <div className="absolute bottom-0 w-full p-6 text-white">

                    <h3 className="text-2xl font-bold">
                      {member.name}
                    </h3>

                    <p className="mt-1 font-semibold text-[#F58220]">
                      {member.position}
                    </p>

                    {member.description && (
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-200">
                        {member.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center gap-2 text-gray-200">
                      <User
                        size={18}
                        className="text-[#F58220]"
                      />

                      <span className="text-sm">
                        Professional Team
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            ))

          )}

        </div>
      </div>
    </section>
  );
}