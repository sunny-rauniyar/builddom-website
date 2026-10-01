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
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const res = await fetch("/api/settings");
    const data = await res.json();

    if (data.success) {
      setSettings(data.settings);
    }
  }

  async function saveSettings() {
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
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#0B2341]">
          Website Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your company information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
                <input
          type="text"
          placeholder="Company Name"
          value={settings.companyName}
          onChange={(e) =>
            setSettings({ ...settings, companyName: e.target.value })
          }
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Tagline"
          value={settings.tagline}
          onChange={(e) =>
            setSettings({ ...settings, tagline: e.target.value })
          }
          className="rounded-lg border p-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={settings.email}
          onChange={(e) =>
            setSettings({ ...settings, email: e.target.value })
          }
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Phone"
          value={settings.phone}
          onChange={(e) =>
            setSettings({ ...settings, phone: e.target.value })
          }
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Address"
          value={settings.address}
          onChange={(e) =>
            setSettings({ ...settings, address: e.target.value })
          }
          className="rounded-lg border p-3 md:col-span-2"
        />

        <input
          type="text"
          placeholder="WhatsApp Number"
          value={settings.whatsapp}
          onChange={(e) =>
            setSettings({ ...settings, whatsapp: e.target.value })
          }
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Facebook URL"
          value={settings.facebook}
          onChange={(e) =>
            setSettings({ ...settings, facebook: e.target.value })
          }
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Instagram URL"
          value={settings.instagram}
          onChange={(e) =>
            setSettings({ ...settings, instagram: e.target.value })
          }
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="LinkedIn URL"
          value={settings.linkedin}
          onChange={(e) =>
            setSettings({ ...settings, linkedin: e.target.value })
          }
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Logo URL"
          value={settings.logo}
          onChange={(e) =>
            setSettings({ ...settings, logo: e.target.value })
          }
          className="rounded-lg border p-3 md:col-span-2"
        />

        <textarea
          placeholder="Footer Text"
          value={settings.footerText}
          onChange={(e) =>
            setSettings({ ...settings, footerText: e.target.value })
          }
          rows={4}
          className="rounded-lg border p-3 md:col-span-2"
        />
              </div>

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