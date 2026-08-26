"use client";

import React, { useState } from "react";
import { Settings, Save, Check, Phone, DollarSign, Bell } from "lucide-react";

export default function AdminSettingsTab() {
  const [helpline, setHelpline] = useState("+880 1879-526108");
  const [bkashNumber, setBkashNumber] = useState("01879526108 (Personal)");
  const [nagadNumber, setNagadNumber] = useState("01879526108 (Personal)");
  const [rocketNumber, setRocketNumber] = useState("018795261089 (Personal)");
  const [admissionOpen, setAdmissionOpen] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.SubmitEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 max-w-3xl font-sans">
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#0077b6]" />
          <span>Platform & Payment Gateway Settings</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Configure active payment numbers, mentor helplines, and admission intake status
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Platform configurations updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
        {/* Helpline & Support */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 block">Mentor Official WhatsApp Helpline</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={helpline}
              onChange={(e) => setHelpline(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:border-[#0077b6] focus:outline-none"
            />
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-slate-900 text-sm">Manual Payment Numbers (Checkout)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">bKash Number</label>
              <input
                type="text"
                value={bkashNumber}
                onChange={(e) => setBkashNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-xs focus:border-[#0077b6] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">Nagad Number</label>
              <input
                type="text"
                value={nagadNumber}
                onChange={(e) => setNagadNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-xs focus:border-[#0077b6] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">Rocket Number</label>
              <input
                type="text"
                value={rocketNumber}
                onChange={(e) => setRocketNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-xs focus:border-[#0077b6] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Global Admission Toggle */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Online Admission Intake</strong>
            <span className="text-slate-500 text-xs">Allow prospective students to submit checkout applications</span>
          </div>
          <input
            type="checkbox"
            checked={admissionOpen}
            onChange={(e) => setAdmissionOpen(e.target.checked)}
            className="w-5 h-5 rounded text-[#0077b6] focus:ring-[#0077b6] cursor-pointer"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#002b5b] hover:bg-[#001a38] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
