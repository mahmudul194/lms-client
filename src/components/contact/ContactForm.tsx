"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <div className="lg:col-span-7 space-y-6 font-sans">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b5b] tracking-tight">
        Send a Message
      </h2>

      {isSubmitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2 animate-in fade-in duration-300">
          <div className="text-xl font-bold">Thank you! Your message has been sent.</div>
          <p className="text-sm">Our support team will get in touch with you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
            />
          </div>

          {/* Row 2: Phone */}
          <div>
            <input
              type="tel"
              required
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all"
            />
          </div>

          {/* Row 3: Message Textarea */}
          <div>
            <textarea
              rows={5}
              required
              placeholder="Message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] focus:ring-1 focus:ring-sky-400 transition-all resize-y"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              Submit Now
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
