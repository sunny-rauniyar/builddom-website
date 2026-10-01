"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Settings {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
}

export default function Contact() {
  const [settings, setSettings] = useState<Settings>({
    companyName: "BuildDom",
    email: "buildom026@gmail.com",
    phone: "+977-9766880501 / +977-9745825337",
    address: "Tikathali, Lalitpur, Nepal",
    whatsapp: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/public/settings");
      const data = await res.json();

      if (data.success) {
        setSettings({
          companyName: data.settings.companyName || "BuildDom",
          email: data.settings.email || "buildom026@gmail.com",
          phone:
            data.settings.phone ||
            "+977-9766880501 / +977-9745825337",
          address:
            data.settings.address ||
            "Tikathali, Lalitpur, Nepal",
          whatsapp: data.settings.whatsapp || "",
        });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoadingSettings(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setSuccess(
        "Your message has been sent successfully. We will contact you soon."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#F8FAFC] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F58220]">
            Contact Us
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-[#0B2341] lg:text-5xl">
            Let's Build Something Great Together
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Have a project in mind? Contact us today for a free
            consultation.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Contact Information */}
          <div>
            <div className="grid gap-6">

              {/* Address */}
              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F58220] text-white">
                  <MapPin size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B2341]">
                    Office Address
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {loadingSettings
                      ? "Loading..."
                      : settings.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F58220] text-white">
                  <Phone size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B2341]">
                    Phone
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {loadingSettings
                      ? "Loading..."
                      : settings.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F58220] text-white">
                  <Mail size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B2341]">
                    Email
                  </h3>

                  <p className="mt-2 break-all text-gray-600">
                    {loadingSettings
                      ? "Loading..."
                      : settings.email}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F58220] text-white">
                  <Clock size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B2341]">
                    Working Hours
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Sun – Fri: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-8 shadow-xl lg:p-10">

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#0B2341]">
                Send Us a Message
              </h3>

              <p className="mt-2 text-gray-500">
                Tell us about your project and our team will
                get back to you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#0B2341]"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#0B2341]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-[#0B2341]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-[#0B2341]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What is your project about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#0B2341]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  name="message"
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 p-4 outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
                />
              </div>

              {/* Success */}
              {success && (
                <div className="flex items-start gap-3 rounded-xl bg-green-50 p-4 text-green-700">
                  <CheckCircle
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{success}</p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-700">
                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#F58220] py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}