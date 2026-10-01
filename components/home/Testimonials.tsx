"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  review: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {
      const res = await fetch("/api/public/testimonials");
      const data = await res.json();

      if (data.success) {
        setTestimonials(data.testimonials);
      }
    } catch (error) {
      console.error("Failed to load testimonials:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="testimonials" className="bg-[#071A31] py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F58220]">
            Testimonials
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-white lg:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Client satisfaction is at the heart of everything we do.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {/* Loading */}
          {loading ? (
            <div className="col-span-full flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#F58220]" />
            </div>
          ) : testimonials.length === 0 ? (

            /* Empty State */
            <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 py-16 text-center">
              <Quote
                size={44}
                className="mx-auto text-[#F58220]"
              />

              <p className="mt-5 text-xl font-semibold text-white">
                No testimonials available yet.
              </p>

              <p className="mt-2 text-gray-400">
                Client reviews will appear here once they are added.
              </p>
            </div>

          ) : (

            testimonials.map((item) => {
              const rating = Math.min(
                5,
                Math.max(0, Number(item.rating) || 5)
              );

              return (
                <div
                  key={item._id}
                  className="group rounded-3xl bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                >

                  {/* Quote Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F58220]/10">
                    <Quote
                      className="text-[#F58220]"
                      size={26}
                    />
                  </div>

                  {/* Stars */}
                  <div className="mt-6 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={19}
                        className={
                          star <= rating
                            ? "fill-[#F58220] text-[#F58220]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="mt-6 leading-8 text-gray-600">
                    "{item.review}"
                  </p>

                  {/* Client */}
                  <div className="mt-8 border-t border-gray-200 pt-5">
                    <h3 className="text-lg font-bold text-[#0B2341]">
                      {item.name}
                    </h3>

                    {item.position && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.position}
                      </p>
                    )}
                  </div>

                </div>
              );
            })

          )}

        </div>

      </div>
    </section>
  );
}