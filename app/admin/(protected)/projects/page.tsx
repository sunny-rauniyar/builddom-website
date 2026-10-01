"use client";

import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  featured: boolean;
}

export default function ProjectsPage() {
  const [uploading, setUploading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    image: "",
    description: "",
    featured: false,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);

    const res = await fetch("/api/projects");
    const data = await res.json();

    if (data.success) {
      setProjects(data.projects);
    }

    setLoading(false);
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      title: "",
      category: "",
      location: "",
      image: "",
      description: "",
      featured: false,
    });
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

    const res = await fetch("/api/projects", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.success) {
      alert(editingId ? "Project Updated" : "Project Added");

      resetForm();

      loadProjects();
    } else {
      alert(data.message);
    }
  }

  function editProject(project: Project) {
    setEditingId(project._id);

    setForm({
      title: project.title,
      category: project.category,
      location: project.location,
      image: project.image,
      description: project.description,
      featured: project.featured,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;

    const res = await fetch("/api/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      loadProjects();
    }
  }
async function uploadImage(file: File) {
  try {
    setUploading(true);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async () => {
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

        alert("Image uploaded successfully!");
      } else {
        alert("Upload failed");
      }

      setUploading(false);
    };
  } catch (error) {
    console.error(error);
    setUploading(false);
  }
}
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-[#0B2341]">
          Projects Management
        </h1>

        <p className="text-gray-500">
          Manage all construction projects.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-6 shadow"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <input
            className="rounded-lg border p-3"
            placeholder="Project Title"
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
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-3"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value,
              })
            }
          />

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
      className="h-32 w-48 rounded-lg border object-cover"
    />
  )}
</div>
            
          

        </div>

        <textarea
          rows={5}
          className="mt-5 w-full rounded-lg border p-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <label className="mt-5 flex items-center gap-3">
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

          Featured Project
        </label>

        <div className="mt-6 flex gap-3">

          <button
            className="rounded-lg bg-[#F58220] px-6 py-3 text-white"
          >
            {editingId ? "Update Project" : "Add Project"}
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
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-center">Featured</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center"
                >
                  No Projects Found
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {project.title}
                  </td>

                  <td className="px-4 py-3">
                    {project.category}
                  </td>

                  <td className="px-4 py-3">
                    {project.location}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {project.featured ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                        No
                      </span>
                    )}
                  </td>

                  <td className="space-x-2 px-4 py-3 text-center">
                    <button
                      onClick={() => editProject(project)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProject(project._id)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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
