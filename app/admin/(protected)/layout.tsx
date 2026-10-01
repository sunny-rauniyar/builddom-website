import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B2341] text-white">
        <div className="border-b border-gray-700 p-6">
          <h1 className="text-2xl font-bold">
            buil<span className="text-[#F58220]">Dom</span>
          </h1>

          <p className="text-sm text-gray-300">
            Admin Panel
          </p>
        </div>

        <nav className="mt-6 flex flex-col">
          <Link
            href="/admin/dashboard"
            className="px-6 py-3 hover:bg-[#12365e]"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/messages"
            className="px-6 py-3 hover:bg-[#12365e]"
          >
            📩 Messages
          </Link>

          <Link
            href="/admin/projects"
            className="px-6 py-3 hover:bg-[#12365e]"
          >
            🏗 Projects
          </Link>

          <Link
            href="/admin/services"
            className="px-6 py-3 hover:bg-[#12365e]"
          >
            🛠 Services
          </Link>

          <Link
            href="/admin/team"
            className="px-6 py-3 hover:bg-[#12365e]"
          >
            👥 Team
          </Link>

          <Link
            href="/admin/testimonials"
            className="px-6 py-3 hover:bg-[#12365e]"
          >
            ⭐ Testimonials
          </Link>

          <Link
            href="/admin/settings"
            className="px-6 py-3 hover:bg-[#12365e]"
          >
            ⚙ Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-[#0B2341]">
              buil<span className="text-[#F58220]">Dom</span> Admin
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {admin.email}
            </p>
          </div>

          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </form>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}