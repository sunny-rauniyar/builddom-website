export default function StatsCards() {
  const stats = [
    { number: "10+", title: "Years Experience" },
    { number: "250+", title: "Projects Completed" },
    { number: "500+", title: "Happy Clients" },
  ];

  return (
    <section className="-mt-16 relative z-20 px-6">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white p-8 text-center shadow-xl"
          >
            <h3 className="text-4xl font-bold text-[#F58220]">
              {item.number}
            </h3>

            <p className="mt-2 text-gray-600 font-medium">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}