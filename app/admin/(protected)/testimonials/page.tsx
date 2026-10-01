"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  _id: string;
  name: string;
  company: string;
  review: string;
  image: string;
  rating: number;
  featured: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    review: "",
    image: "",
    rating: 5,
    featured: false,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    setLoading(true);

    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();

      if (data.success) {
        setTestimonials(data.testimonials);
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

    const res = await fetch("/api/testimonials", {
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
          ? "Testimonial updated successfully"
          : "Testimonial added successfully"
      );

      resetForm();
      loadTestimonials();
    } else {
      alert("Something went wrong");
    }
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Delete this testimonial?")) return;

    const res = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Testimonial deleted");
      loadTestimonials();
    }
  }

  function editTestimonial(item: Testimonial) {
    setEditingId(item._id);

    setForm({
      name: item.name,
      company: item.company,
      review: item.review,
      image: item.image,
      rating: item.rating,
      featured: item.featured,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      name: "",
      company: "",
      review: "",
      image: "",
      rating: 5,
      featured: false,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0B2341]">
          Testimonials Management
        </h1>

        <p className="text-gray-500">
          Manage customer testimonials.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-6 shadow"
      >
        <div className="grid gap-5 md:grid-cols-2">

          <input
            className="rounded-lg border p-3"
            placeholder="Customer Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-3"
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value,
              })
            }
          />

          <textarea
            className="rounded-lg border p-3 md:col-span-2"
            rows={5}
            placeholder="Review"
            value={form.review}
            onChange={(e) =>
              setForm({
                ...form,
                review: e.target.value,
              })
            }
          />          <div className="space-y-3">
            <label className="font-medium">
              Rating
            </label>

            <select
              className="rounded-lg border p-3"
              value={form.rating}
              onChange={(e) =>
                setForm({
                  ...form,
                  rating: Number(e.target.value),
                })
              }
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>

          <div className="space-y-3">
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
                className="h-40 w-40 rounded-full border object-cover"
              />
            )}
          </div>

          <label className="flex items-center gap-3 md:col-span-2">
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

            Featured Testimonial
          </label>

        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-[#F58220] px-6 py-3 text-white hover:bg-orange-600"
          >
            {editingId ? "Update Testimonial" : "Add Testimonial"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg bg-gray-500 px-6 py-3 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-[#0B2341] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-center">Rating</th>
              <th className="px-4 py-3 text-center">Featured</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              testimonials.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {item.name}
                  </td>

                  <td className="px-4 py-3">
                    {item.company}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {"⭐".repeat(item.rating)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {item.featured ? "Yes" : "No"}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => editTestimonial(item)}
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTestimonial(item._id)}
                      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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