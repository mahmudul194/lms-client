"use client";

import React, { useState, useEffect } from "react";
import { contactApi, ContactMessage } from "@/services/api/contactApi";

export default function AdminContactsTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await contactApi.getAll();
      setMessages(data);
      setError("");
    } catch (err: any) {
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'unread' | 'read' | 'archived') => {
    try {
      await contactApi.updateStatus(id, status);
      await loadMessages();
    } catch (err: any) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await contactApi.delete(id);
      await loadMessages();
    } catch (err: any) {
      alert("Failed to delete message");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#002b5b]">Contact Messages</h2>
          <p className="text-sm text-slate-500">View and manage messages from the Contact Us page.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>No messages found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4 max-w-xs">Message</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        msg.status === 'unread' ? 'bg-amber-100 text-amber-700' :
                        msg.status === 'read' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{msg.name}</div>
                      <div className="text-xs text-slate-500">{msg.email}</div>
                      {msg.phone && <div className="text-xs text-slate-400">{msg.phone}</div>}
                    </td>
                    <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis text-slate-600 whitespace-normal">
                      <div className="line-clamp-2" title={msg.message}>{msg.message}</div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {msg.status === 'unread' && (
                        <button onClick={() => handleUpdateStatus(msg.id, 'read')} className="text-emerald-600 hover:text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-1 rounded">Mark Read</button>
                      )}
                      <button onClick={() => handleDelete(msg.id)} className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
