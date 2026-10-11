"use client";

import { Smartphone, Mail, MessageCircle } from "lucide-react";

export default function ContactInfoSidebar() {
  return (
    <div className="space-y-7 font-sans">
      {/* Heading */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2">
          <span className="h-2 w-2 rounded-full bg-[#0077b6]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0077b6]">
            Contact Information
          </span>
        </div>

        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#002b5b] sm:text-4xl">
          Keep In Touch
          <br />
          <span className="text-[#0077b6]">With Us.</span>
        </h2>

        <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Have a question or need assistance? Reach out to us through any of
          the channels below. Our team is ready to help.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-1 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-4">
        {/* Phone 1 */}
        <div className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-sky-50/80 sm:p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-[#0077b6] transition-all duration-300 group-hover:border-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white">
            <Smartphone className="h-5 w-5 stroke-[2]" />
          </div>

          <div className="min-w-0 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Phone
            </h4>
            <p className="break-words text-sm font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#0077b6] sm:text-base">
              +880 1879-526108
            </p>
            <p className="text-xs text-slate-500">Give us a call</p>
          </div>
        </div>

        <div className="mx-4 border-t border-slate-100" />

        {/* Phone 2 */}
        <div className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-sky-50/80 sm:p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-[#0077b6] transition-all duration-300 group-hover:border-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white">
            <Smartphone className="h-5 w-5 stroke-[2]" />
          </div>

          <div className="min-w-0 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Phone
            </h4>
            <p className="break-words text-sm font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#0077b6] sm:text-base">
              +880 1739-081633
            </p>
            <p className="text-xs text-slate-500">We're happy to help</p>
          </div>
        </div>

        <div className="mx-4 border-t border-slate-100" />

        {/* Email */}
        <div className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-sky-50/80 sm:p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-[#0077b6] transition-all duration-300 group-hover:border-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white">
            <Mail className="h-5 w-5 stroke-[2]" />
          </div>

          <div className="min-w-0 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Email
            </h4>
            <p className="break-words text-sm font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#0077b6] sm:text-base">
              info@advancebim.net
            </p>
            <p className="text-xs text-slate-500">Send us an email</p>
          </div>
        </div>
      </div>

      {/* Support Note */}
      <div className="relative overflow-hidden rounded-2xl bg-[#002b5b] p-5 text-white sm:p-6">
        <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-sky-400/10 blur-2xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sky-300">
            <MessageCircle className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-bold">We're here to help</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Tell us what you need, and let's find the right solution together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
