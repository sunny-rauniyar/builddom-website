"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#071A31] via-[#0B2341] to-[#12365e] px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white">
            buil<span className="text-[#F58220]">Dom</span>
          </h1>

          <p className="mt-2 text-gray-300">
            Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="rounded-2xl bg-white p-8 shadow-2xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F58220]/10">
              <LockKeyhole
                size={26}
                className="text-[#F58220]"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#0B2341]">
              Admin Login
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to manage your website
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter admin email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="Enter password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F58220] py-3 font-semibold text-white transition hover:bg-[#d96f12] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2
                  size={19}
                  className="animate-spin"
                />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} builDom
        </p>
      </div>
    </div>
  );
}