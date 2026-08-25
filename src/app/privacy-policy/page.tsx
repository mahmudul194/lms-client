import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">Privacy Policy</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500 font-semibold">Last Updated: August 2026</p>

        <section className="space-y-2 pt-2">
          <h2 className="text-base font-bold text-slate-900">1. Information Collection and Use</h2>
          <p className="leading-relaxed">
            BIM Build BD collects student full names, email addresses, phone numbers, and professional backgrounds strictly for admission verification, Zoom class link distribution, learning portal access, and official QR-verified certificate issuance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Payment and Transaction Security</h2>
          <p className="leading-relaxed">
            All payments made through bKash, Nagad, Rocket, or SSLCommerz (Credit/Debit cards) are processed over end-to-end encrypted banking gateways complying with international PCI-DSS security protocols. We do not store credit card numbers or banking PINs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Data Protection & Non-Disclosure</h2>
          <p className="leading-relaxed">
            Student personal information is kept strictly confidential and is never shared, rented, or sold to third-party marketing services under any circumstances.
          </p>
        </section>
      </div>
    </div>
  );
}
