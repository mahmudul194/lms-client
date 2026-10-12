"use client";

import React, { useState } from "react";
import { contactApi } from "@/services/api/contactApi";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactApi.create(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 4000);
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Form Heading */}
      <div className="mb-2">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1 w-8 rounded-full bg-[#0077b6]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077b6]">
            Contact Form
          </span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight text-[#002b5b] sm:text-3xl">
          Send a Message
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Fill out the form below and our team will get back to you shortly.
        </p>
      </div>

      {isSubmitted ? (
        <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 12 4 4L19 6"
              />
            </svg>
          </div>

          <div className="text-lg font-bold text-emerald-800 sm:text-xl">
            Thank you! Your message has been sent.
          </div>
          <p className="text-sm leading-6 text-emerald-700">
            Our support team will get in touch with you shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_35px_-15px_rgba(0,43,91,0.15)] sm:p-7 lg:p-8"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="block text-sm font-semibold text-slate-700"
              >
                Full Name <span className="text-[#0077b6]">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0077b6] focus:bg-white focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="block text-sm font-semibold text-slate-700"
              >
                Email Address <span className="text-[#0077b6]">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0077b6] focus:bg-white focus:ring-4 focus:ring-sky-100"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label
              htmlFor="contact-phone"
              className="block text-sm font-semibold text-slate-700"
            >
              Phone Number <span className="text-[#0077b6]">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              required
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0077b6] focus:bg-white focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="contact-message"
              className="block text-sm font-semibold text-slate-700"
            >
              Your Message <span className="text-[#0077b6]">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={5}
              required
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0077b6] focus:bg-white focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0077b6] px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#005a8c] hover:shadow-lg hover:shadow-sky-900/20 active:translate-y-0 active:scale-[0.99] sm:w-auto"
            >
              <span>Submit Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17 17 7M7 7h10v10"
                />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
