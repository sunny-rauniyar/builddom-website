import {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "We follow strict quality standards to ensure every project is safe, durable and built to last.",
  },
  {
    icon: BadgeCheck,
    title: "Experienced Team",
    description:
      "Our engineers, architects and project managers bring years of industry expertise.",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    description:
      "Efficient planning and execution help us complete projects within schedule.",
  },
  {
    icon: Users,
    title: "Client Focused",
    description:
      "We work closely with every client to understand their vision and exceed expectations.",
  },
  {
    icon: Building2,
    title: "Modern Technology",
    description:
      "We use advanced engineering tools and construction practices for better results.",
  },
  {
    icon: TrendingUp,
    title: "Cost Effective",
    description:
      "High-quality engineering solutions with transparent pricing and maximum value.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-us" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <p className="text-[#F58220] font-semibold uppercase tracking-[0.3em]">
            Why Choose BuildDom
          </p>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[#0B2341]">
            Building Trust Through Excellence
          </h2>

          <p className="mt-6 mx-auto max-w-3xl text-lg text-gray-600 leading-8">
            We combine innovation, engineering expertise, and quality
            craftsmanship to deliver reliable construction solutions
            across Nepal.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-[#F58220] hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 transition group-hover:bg-[#F58220]">

                  <Icon
                    size={30}
                    className="text-[#F58220] group-hover:text-white"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#0B2341]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}