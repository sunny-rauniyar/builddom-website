import Image from "next/image";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Modern Residential Villa",
    category: "Residential",
    image: "/images/projects/project1.jpg",
  },
  {
    title: "Commercial Office Complex",
    category: "Commercial",
    image: "/images/projects/project2.jpg",
  },
  {
    title: "Highway Bridge Project",
    category: "Infrastructure",
    image: "/images/projects/project3.jpg",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-[#071A31] to-[#0B2341] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
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

        {/* Project Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#071A31]/20 transition-all duration-500 group-hover:bg-[#071A31]/55"></div>

                {/* Category */}
                <div className="absolute left-5 top-5 rounded-full bg-[#F58220] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  {project.category}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 w-full p-6">

                  <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#F58220]">
                    {project.title}
                  </h3>

                  <button className="mt-4 inline-flex items-center gap-2 font-semibold text-[#F58220] transition-all duration-300 group-hover:gap-4">
                    View Project
                    <ArrowRight size={18} />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <button className="rounded-2xl bg-[#F58220] px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30">
            View All Projects
          </button>
        </div>

      </div>
    </section>
  );
}