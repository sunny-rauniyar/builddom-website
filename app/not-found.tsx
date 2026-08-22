import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#071A31] text-white px-6">
      <h1 className="text-8xl font-extrabold text-[#F58220]">
        404
      </h1>

      <h2 className="mt-6 text-4xl font-bold">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-xl text-center text-gray-300">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-10 rounded-xl bg-[#F58220] px-8 py-4 font-semibold"
      >
        Back Home
      </Link>
    </main>
  );
}