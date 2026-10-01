"use client";

import { useEffect, useState } from "react";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  featured: boolean;
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    position: "",
    image: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    featured: false,
  });

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    setLoading(true);

    try {
      const res = await fetch("/api/team");
      const data = await res.json();

      if (data.success) {
        setTeam(data.team);
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

    const res = await fetch("/api/team", {
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
          ? "Team member updated successfully"
          : "Team member added successfully"
      );

      resetForm();
      loadTeam();
    } else {
      alert("Something went wrong");
    }
  }

  async function deleteMember(id: string) {
    if (!confirm("Delete this team member?")) return;

    const res = await fetch("/api/team", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Team member deleted");
      loadTeam();
    }
  }

  function editMember(member: TeamMember) {
    setEditingId(member._id);

    setForm({
      name: member.name,
      position: member.position,
      image: member.image,
      facebook: member.facebook,
      instagram: member.instagram,
      linkedin: member.linkedin,
      featured: member.featured,
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
      position: "",
      image: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      featured: false,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0B2341]">
          Team Management
        </h1>

        <p className="text-gray-500">
          Manage all team members.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-6 shadow"
      >
        <div className="grid gap-5 md:grid-cols-2">

          <input
            className="rounded-lg border p-3"
            placeholder="Full Name"
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
            placeholder="Position"
            value={form.position}
            onChange={(e) =>
              setForm({
                ...form,
                position: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-3"
            placeholder="Facebook URL"
            value={form.facebook}
            onChange={(e) =>
              setForm({
                ...form,
                facebook: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-3"
            placeholder="Instagram URL"
            value={form.instagram}
            onChange={(e) =>
              setForm({
                ...form,
                instagram: e.target.value,
              })
            }
          />          <input
            className="rounded-lg border p-3"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={(e) =>
              setForm({
                ...form,
                linkedin: e.target.value,
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
                className="h-40 w-40 rounded-lg border object-cover"
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

            Featured Team Member
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-[#F58220] px-6 py-3 text-white hover:bg-orange-600"
          >
            {editingId ? "Update Member" : "Add Member"}
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
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-center">Featured</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              team.map((member) => (
                <tr
                  key={member._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {member.name}
                  </td>

                  <td className="px-4 py-3">
                    {member.position}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {member.featured ? "Yes" : "No"}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => editMember(member)}
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteMember(member._id)}
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