<section id="contact" className="..."></section>
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#F8FAFC] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F58220]">
            Contact Us
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-[#0B2341] lg:text-5xl">
            Let's Build Something Great Together
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Have a project in mind? Contact us today for a free consultation.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Contact Information */}
          <div>

            <div className="grid gap-6">

              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F58220] text-white">
                  <MapPin />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B2341]">Office Address</h3>
                  <p className="mt-2 text-gray-600">
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F58220] text-white">
                  <Phone />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B2341]">Phone</h3>
                  <p className="mt-2 text-gray-600">
                    +977-98XXXXXXXX
                  </p>
                </div>
              </div>

              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F58220] text-white">
                  <Mail />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B2341]">Email</h3>
                  <p className="mt-2 text-gray-600">
                    info@buildom.com
                  </p>
                </div>
              </div>

              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F58220] text-white">
                  <Clock />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B2341]">Working Hours</h3>
                  <p className="mt-2 text-gray-600">
                    Sun – Fri: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border p-4 outline-none focus:border-[#F58220]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border p-4 outline-none focus:border-[#F58220]"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-xl border p-4 outline-none focus:border-[#F58220]"
              />

              <textarea
                rows={6}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border p-4 outline-none focus:border-[#F58220]"
              />

              <button
                className="w-full rounded-xl bg-[#F58220] py-4 font-semibold text-white transition hover:bg-orange-600"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}