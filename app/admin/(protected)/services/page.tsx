"use client";

import { useEffect, useState } from "react";

interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
  featured: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    image: "",
    icon: "",
    featured: false,
  });

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);

    try {
      const res = await fetch("/api/services");
      const data = await res.json();

      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function uploadImage(file: File) {
    setUploading(true);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: reader.result,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setForm((prev) => ({
            ...prev,
            image: data.imageUrl,
          }));

          alert("Image uploaded successfully");
        } else {
          alert("Upload failed");
        }
      } catch (error) {
        console.error(error);
      }

      setUploading(false);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";

    const body = editingId
      ? {
          id: editingId,
          ...form,
        }
      : form;

    const res = await fetch("/api/services", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.success) {
      alert(
        editingId
          ? "Service Updated Successfully"
          : "Service Added Successfully"
      );

      setForm({
        title: "",
        shortDescription: "",
        description: "",
        image: "",
        icon: "",
        featured: false,
      });

      setEditingId(null);

      loadServices();
    } else {
      alert("Something went wrong");
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Delete this service?")) return;

    const res = await fetch("/api/services", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Service Deleted");

      loadServices();
    }
  }

  function editService(service: Service) {
    setEditingId(service._id);

    setForm({
      title: service.title,
      shortDescription: service.shortDescription,
      description: service.description,
      image: service.image,
      icon: service.icon,
      featured: service.featured,
    });
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      title: "",
      shortDescription: "",
      description: "",
      image: "",
      icon: "",
      featured: false,
    });
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Services Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-lg border p-3"
            placeholder="Service Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-3"
            placeholder="Icon (FaHome etc.)"
            value={form.icon}
            onChange={(e) =>
              setForm({
                ...form,
                icon: e.target.value,
              })
            }
          />

          <textarea
            className="rounded-lg border p-3 md:col-span-2"
            rows={2}
            placeholder="Short Description"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({
                ...form,
                shortDescription: e.target.value,
              })
            }
          />
                    <textarea
            className="rounded-lg border p-3 md:col-span-2"
            rows={5}
            placeholder="Full Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <div className="md:col-span-2 space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  uploadImage(e.target.files[0]);
                }
              }}
            />

            {uploading && (
              <p className="text-blue-600 font-medium">
                Uploading image...
              </p>
            )}

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="h-40 w-60 rounded-lg border object-cover"
              />
            )}
          </div>

          <label className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({
                  ...form,
                  featured: e.target.checked,
                })
              }
            />

            Featured Service
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            {editingId ? "Update Service" : "Add Service"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg bg-gray-600 px-6 py-3 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Featured</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service._id}
                  className="border-t"
                >
                  <td className="p-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-16 w-20 rounded object-cover"
                    />
                  </td>

                  <td className="p-4">
                    <div className="font-semibold">
                      {service.title}
                    </div>

                    <div className="text-sm text-gray-500">
                      {service.shortDescription}
                    </div>
                  </td>

                  <td className="p-4">
                    {service.featured ? "Yes" : "No"}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => editService(service)}
                      className="rounded bg-yellow-500 px-4 py-2 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteService(service._id)}
                      className="rounded bg-red-600 px-4 py-2 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
                          
            
          </tbody>
        </table>
      </div>
    </div>
  );
}