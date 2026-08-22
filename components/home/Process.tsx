import {
  MessageSquare,
  ClipboardList,
  Hammer,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We discuss your vision, requirements, budget and project goals.",
  },
  {
    icon: ClipboardList,
    title: "Planning & Design",
    description:
      "Our experts prepare architectural drawings, engineering plans and project schedules.",
  },
  {
    icon: Hammer,
    title: "Construction",
    description:
      "Our experienced team executes the project with quality materials and strict safety standards.",
  },
  {
    icon: CheckCircle,
    title: "Project Delivery",
    description:
      "We complete final inspections and deliver your project on time with complete satisfaction.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-[#F8FAFC] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F58220]">
            Our Process
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-[#0B2341] lg:text-5xl">
            From Concept to Completion
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            We follow a structured process to ensure every project is delivered
            with quality, transparency and efficiency.
          </p>
        </div>

        <div className="relative mt-20 grid gap-10 md:grid-cols-4">

          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-10 hidden h-1 bg-gray-200 md:block"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative text-center">

                <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F58220] text-white shadow-xl">
                  <Icon size={34} />
                </div>

                <div className="mt-6">
                  <span className="text-sm font-bold text-[#F58220]">
                    STEP {index + 1}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold text-[#0B2341]">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}