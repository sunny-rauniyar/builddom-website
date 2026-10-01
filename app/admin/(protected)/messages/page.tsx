"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Trash2,
  RefreshCw,
  MessageSquare,
  User,
} from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadMessages(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await fetch("/api/messages");
      const data = await res.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  const deleteMessage = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this message?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((currentMessages) =>
          currentMessages.filter((msg) => msg._id !== id)
        );
      } else {
        alert(data.message || "Failed to delete message.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0B2341]">
            Contact Messages
          </h1>

          <p className="mt-1 text-gray-500">
            Messages received from your website visitors.
          </p>
        </div>

        <button
          onClick={() => loadMessages(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B2341] px-5 py-3 font-semibold text-white transition hover:bg-[#071A31] disabled:opacity-60"
        >
          <RefreshCw
            size={18}
            className={refreshing ? "animate-spin" : ""}
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Message Count */}
      {!loading && (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F58220]/10">
            <MessageSquare
              size={24}
              className="text-[#F58220]"
            />
          </div>

          <div>
            <p className="text-2xl font-bold text-[#0B2341]">
              {messages.length}
            </p>

            <p className="text-sm text-gray-500">
              {messages.length === 1
                ? "Contact message"
                : "Contact messages"}
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
          <RefreshCw
            size={32}
            className="mx-auto animate-spin text-[#F58220]"
          />

          <p className="mt-4 text-gray-500">
            Loading messages...
          </p>
        </div>

      ) : messages.length === 0 ? (

        /* Empty State */
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F58220]/10">
            <Mail
              size={30}
              className="text-[#F58220]"
            />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#0B2341]">
            No messages yet
          </h2>

          <p className="mt-2 text-gray-500">
            Contact form submissions will appear here.
          </p>
        </div>

      ) : (

        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-lg lg:block">
            <table className="min-w-full">
              <thead className="bg-[#0B2341] text-white">
                <tr>
                  <th className="px-5 py-4 text-left">Visitor</th>
                  <th className="px-5 py-4 text-left">Contact</th>
                  <th className="px-5 py-4 text-left">Subject</th>
                  <th className="px-5 py-4 text-left">Message</th>
                  <th className="px-5 py-4 text-left">Date</th>
                  <th className="px-5 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    {/* Visitor */}
                    <td className="px-5 py-5 align-top">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2341]/10">
                          <User
                            size={18}
                            className="text-[#0B2341]"
                          />
                        </div>

                        <span className="font-semibold text-[#0B2341]">
                          {msg.name}
                        </span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-5 align-top">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={15} />
                          <span>{msg.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={15} />
                          <span>{msg.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-5 py-5 align-top">
                      <span className="font-semibold text-[#0B2341]">
                        {msg.subject || "No subject"}
                      </span>
                    </td>

                    {/* Message */}
                    <td className="max-w-sm px-5 py-5 align-top">
                      <p className="line-clamp-3 leading-6 text-gray-600">
                        {msg.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-5 align-top text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={15} />

                        {new Date(
                          msg.createdAt
                        ).toLocaleString()}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-5 text-center align-top">
                      <button
                        onClick={() =>
                          deleteMessage(msg._id)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="grid gap-5 lg:hidden">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="rounded-2xl bg-white p-6 shadow-lg"
              >
                {/* Name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B2341]/10">
                    <User
                      size={20}
                      className="text-[#0B2341]"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0B2341]">
                      {msg.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {msg.subject || "No subject"}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail
                      size={17}
                      className="text-[#F58220]"
                    />
                    <span className="break-all">
                      {msg.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone
                      size={17}
                      className="text-[#F58220]"
                    />
                    <span>{msg.phone}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Calendar size={17} />
                    <span>
                      {new Date(
                        msg.createdAt
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-[#0B2341]">
                    Message
                  </p>

                  <p className="mt-2 leading-6 text-gray-600">
                    {msg.message}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                >
                  <Trash2 size={17} />
                  Delete Message
                </button>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}