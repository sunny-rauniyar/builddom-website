"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  HardHat,
  PencilRuler,
  Hammer,
  Wrench,
  ArrowRight,
} from "lucide-react";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, any> = {
  Building2,
  HardHat,
  PencilRuler,
  Hammer,
  Wrench,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const res = await fetch("/api/public/services");
      const data = await res.json();

      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section
      id="services"
      className="bg-[#F8FAFC] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <p className="font-semibold uppercase tracking-[0.3em] text-[#F58220]">
            Our Services
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-[#0B2341] lg:text-5xl">
            Complete Engineering &
            <br />
            Construction Solutions
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            We deliver comprehensive construction and engineering services
            with innovation, precision and a commitment to excellence.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {services.length === 0 ? (
            <div className="col-span-full text-center text-xl text-gray-500">
              No services available.
            </div>
          ) : (
            services.map((service) => {
              const Icon =
                iconMap[service.icon] || Building2;

              return (
                <div
                  key={service._id}
                  className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-[#F58220] hover:shadow-2xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F58220]/10 transition-all duration-300 group-hover:bg-[#F58220]">
                    <Icon
                      size={34}
                      className="text-[#F58220] group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-[#0B2341]">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {service.description}
                  </p>

                  <button className="mt-8 flex items-center gap-2 font-semibold text-[#F58220] transition-all duration-300 group-hover:gap-4">
                    Learn More
                    <ArrowRight size={18} />
                  </button>
                </div>
              );
            })
          )}

        </div>
      </div>
    </section>
  );
}