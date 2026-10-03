
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const features = [
  "Licensed & Experienced Engineers",
  "Quality Construction Standards",
  "On-Time Project Delivery",
  "Innovative & Sustainable Solutions",
];

export default function About() {
  return (
    <section id="about" className="bg-white py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left Image */}
        <div className="relative">
          <Image
            src="/images/about/about.jpg"
            alt="About BuildDom"
            width={650}
            height={750}
            className="rounded-3xl object-cover shadow-2xl"
          />
        </div>

        {/* Right Content */}
        <div>

          <span className="font-semibold uppercase tracking-[0.25em] text-[#F58220]">
            About Us
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-[#0B2341] lg:text-5xl">
            Building Better
            <br />
            Together...
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            BuildDom is a trusted construction and engineering company
            delivering residential, commercial and infrastructure projects
            across Nepal. We combine technical expertise with modern
            construction practices to create safe, durable and sustainable
            developments.
          </p>

          {/* Mission & Vision */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-3xl border p-6 shadow-lg transition hover:-translate-y-2">
              <h3 className="mb-3 text-xl font-bold text-[#0B2341]">
                Our Mission
              </h3>

              <p className="text-gray-600">
                Deliver innovative construction solutions while maintaining
                the highest standards of quality, safety and customer
                satisfaction.
              </p>
            </div>

            <div className="rounded-3xl border p-6 shadow-lg transition hover:-translate-y-2">
              <h3 className="mb-3 text-xl font-bold text-[#0B2341]">
                Our Vision
              </h3>

              <p className="text-gray-600">
                To become Nepal's most trusted engineering and construction
                company through innovation and excellence.
              </p>
            </div>

          </div>

          {/* Features */}
          <div className="mt-10 grid gap-4">
            {features.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle
                  className="text-[#F58220]"
                  size={22}
                />

                <span className="font-medium text-gray-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-10 rounded-2xl bg-[#F58220] px-8 py-4 font-semibold text-white transition hover:bg-orange-600">
            Learn More
          </button>

        </div>

      </div>
    </section>
  );
}
