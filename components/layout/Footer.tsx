import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#071A31] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <h2 className="text-3xl font-extrabold">
              buil<span className="text-[#F58220]">D</span>om
            </h2>

            <p className="mt-6 leading-8 text-gray-300">
              Build Better <span className="text-[#F58220]">Together.</span>
              <br />
              <br />
              We deliver high-quality construction, architecture and engineering
              solutions across Nepal with innovation, trust and excellence.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#F58220]"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#F58220]"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#F58220]"
              >
                <FaLinkedinIn size={18} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xl font-bold">
              Quick Links
            </h3>

            <div className="space-y-4">

              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Services", "#services"],
                ["Projects", "#projects"],
                ["Contact", "#contact"],
              ].map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="flex items-center gap-2 text-gray-300 transition hover:text-[#F58220]"
                >
                  <ArrowRight size={16} />
                  {name}
                </Link>
              ))}

            </div>
          </div>

          {/* Services */}
          <div>

            <h3 className="mb-6 text-xl font-bold">
              Our Services
            </h3>

            <div className="space-y-4 text-gray-300">

              <p>Building Construction</p>
              <p>Architecture Design</p>
              <p>Civil Engineering</p>
              <p>Project Management</p>
              <p>Interior Design</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-6 text-xl font-bold">
              Contact Info
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">
                <MapPin className="mt-1 text-[#F58220]" size={20} />
                <span className="text-gray-300">
                  Kathmandu, Nepal
                </span>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-1 text-[#F58220]" size={20} />
                <span className="text-gray-300">
                  +977-98XXXXXXXX
                </span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-1 text-[#F58220]" size={20} />
                <span className="text-gray-300">
                  info@buildom.com
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 text-center text-gray-400 md:flex-row">

            <p>
              © {new Date().getFullYear()} builDom Construction Pvt. Ltd. All Rights Reserved.
            </p>

            <p>
              Build <span className="text-[#F58220]">Better</span> Together
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}