"use client";

import { useEffect, useState } from "react";

interface Settings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  logo: string;
  footerText: string;

  projectsCompleted: string;
  happyClients: string;
  yearsExperience: string;

  heroBadge: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryButton: string;
  heroSecondaryButton: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    companyName: "",
    tagline: "",
    email: "",
    phone: "",
    address: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    logo: "",
    footerText: "",

    projectsCompleted: "250+",
    happyClients: "500+",
    yearsExperience: "10+",

    heroBadge: "Trusted Construction & Engineering Company",
    heroHeading: "Building Beyond Structures. Building Trust.",
    heroDescription:
      "BuildDom delivers innovative engineering, architecture and construction solutions across Nepal with an unwavering commitment to quality, safety and sustainable development.",
    heroPrimaryButton: "Request Consultation",
    heroSecondaryButton: "View Projects",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();

      if (data.success && data.settings) {
        setSettings({
          companyName: data.settings.companyName || "",
          tagline: data.settings.tagline || "",
          email: data.settings.email || "",
          phone: data.settings.phone || "",
          address: data.settings.address || "",
          whatsapp: data.settings.whatsapp || "",
          facebook: data.settings.facebook || "",
          instagram: data.settings.instagram || "",
          linkedin: data.settings.linkedin || "",
          logo: data.settings.logo || "",
          footerText: data.settings.footerText || "",

          projectsCompleted:
            data.settings.projectsCompleted || "250+",
          happyClients:
            data.settings.happyClients || "500+",
          yearsExperience:
            data.settings.yearsExperience || "10+",

          heroBadge:
            data.settings.heroBadge ||
            "Trusted Construction & Engineering Company",

          heroHeading:
            data.settings.heroHeading ||
            "Building Beyond Structures. Building Trust.",

          heroDescription:
            data.settings.heroDescription ||
            "BuildDom delivers innovative engineering, architecture and construction solutions across Nepal with an unwavering commitment to quality, safety and sustainable development.",

          heroPrimaryButton:
            data.settings.heroPrimaryButton ||
            "Request Consultation",

          heroSecondaryButton:
            data.settings.heroSecondaryButton ||
            "View Projects",
        });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }

  async function saveSettings() {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (data.success) {
        alert("Settings updated successfully!");
      } else {
        alert("Failed to update settings.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#0B2341]">
          Website Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your company information and website content.
        </p>
      </div>

      {/* Company Information */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-[#0B2341]">
          Company Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            placeholder="Company Name"
            value={settings.companyName}
            onChange={(e) =>
              setSettings({
                ...settings,
                companyName: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Tagline"
            value={settings.tagline}
            onChange={(e) =>
              setSettings({
                ...settings,
                tagline: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={settings.email}
            onChange={(e) =>
              setSettings({
                ...settings,
                email: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Phone"
            value={settings.phone}
            onChange={(e) =>
              setSettings({
                ...settings,
                phone: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Address"
            value={settings.address}
            onChange={(e) =>
              setSettings({
                ...settings,
                address: e.target.value,
              })
            }
            className="rounded-lg border p-3 md:col-span-2"
          />

          <input
            type="text"
            placeholder="WhatsApp Number"
            value={settings.whatsapp}
            onChange={(e) =>
              setSettings({
                ...settings,
                whatsapp: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Facebook URL"
            value={settings.facebook}
            onChange={(e) =>
              setSettings({
                ...settings,
                facebook: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Instagram URL"
            value={settings.instagram}
            onChange={(e) =>
              setSettings({
                ...settings,
                instagram: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="LinkedIn URL"
            value={settings.linkedin}
            onChange={(e) =>
              setSettings({
                ...settings,
                linkedin: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Logo URL"
            value={settings.logo}
            onChange={(e) =>
              setSettings({
                ...settings,
                logo: e.target.value,
              })
            }
            className="rounded-lg border p-3 md:col-span-2"
          />

          <textarea
            placeholder="Footer Text"
            value={settings.footerText}
            onChange={(e) =>
              setSettings({
                ...settings,
                footerText: e.target.value,
              })
            }
            rows={4}
            className="rounded-lg border p-3 md:col-span-2"
          />
        </div>
      </div>

      {/* Hero Statistics */}
      <div>
        <h2 className="mb-2 text-xl font-bold text-[#0B2341]">
          Hero Statistics
        </h2>

        <p className="mb-4 text-sm text-gray-500">
          These values appear in the three statistic cards on the homepage.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Projects Completed
            </label>

            <input
              type="text"
              value={settings.projectsCompleted}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  projectsCompleted: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Happy Clients
            </label>

            <input
              type="text"
              value={settings.happyClients}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  happyClients: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Years Experience
            </label>

            <input
              type="text"
              value={settings.yearsExperience}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  yearsExperience: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div>
        <h2 className="mb-2 text-xl font-bold text-[#0B2341]">
          Hero Content
        </h2>

        <p className="mb-4 text-sm text-gray-500">
          Manage the main content displayed in the homepage hero section.
        </p>

        <div className="space-y-6">
          {/* Badge */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Hero Badge
            </label>

            <input
              type="text"
              value={settings.heroBadge}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroBadge: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Hero Heading
            </label>

            <textarea
              value={settings.heroHeading}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroHeading: e.target.value,
                })
              }
              rows={3}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-xs text-gray-500">
              Example: Building Beyond Structures. Building Trust.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Hero Description
            </label>

            <textarea
              value={settings.heroDescription}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroDescription: e.target.value,
                })
              }
              rows={5}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Buttons */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Primary Button Text
              </label>

              <input
                type="text"
                value={settings.heroPrimaryButton}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    heroPrimaryButton: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Secondary Button Text
              </label>

              <input
                type="text"
                value={settings.heroSecondaryButton}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    heroSecondaryButton: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="rounded-lg bg-[#F58220] px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}