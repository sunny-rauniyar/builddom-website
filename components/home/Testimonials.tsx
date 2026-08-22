import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    position: "Home Owner",
    review:
      "BuildDom exceeded our expectations. Their professionalism, quality workmanship, and timely delivery made the entire construction process stress-free.",
  },
  {
    name: "Anita Gurung",
    position: "Business Owner",
    review:
      "Their engineering team was highly knowledgeable and maintained excellent communication throughout the project. I highly recommend BuildDom.",
  },
  {
    name: "Suman Thapa",
    position: "Property Developer",
    review:
      "From planning to completion, everything was handled professionally. The final result was exactly what we envisioned.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#071A31] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F58220]">
            Testimonials
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-white lg:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
            Client satisfaction is at the heart of everything we do.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Quote className="text-[#F58220]" size={42} />

              <div className="mt-5 flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-[#F58220] text-[#F58220]"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                "{item.review}"
              </p>

              <div className="mt-8 border-t pt-5">
                <h3 className="font-bold text-[#0B2341]">{item.name}</h3>
                <p className="text-gray-500">{item.position}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}