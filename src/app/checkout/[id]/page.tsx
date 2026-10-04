"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { batchesApi, BatchItem } from "@/services/api";
import { authApi } from "@/services/api/authApi";
import { enrollmentsApi } from "@/services/api/enrollmentsApi";
import { installmentsApi } from "@/services/api/installmentsApi";
import { paymentsApi } from "@/services/api/paymentsApi";
import { couponsApi } from "@/services/api/couponsApi";
import { getAuthToken } from "@/services/api/apiClient";
import Link from "next/link";

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params.id as string;
  const paymentType = searchParams.get("type") || "full";

  const [batch, setBatch] = useState<BatchItem | any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  // User profile state
  const [profile, setProfile] = useState({
    id: "",
    name: "Loading...",
    email: "Loading...",
    phone: "Loading..."
  });

  useEffect(() => {
    // 1. Check Auth
    const token = getAuthToken();
    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(`/checkout/${id}?type=${paymentType}`)}`);
      return;
    }

    // Fetch User Profile
    authApi.getMe().then(res => {
      if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
        const u: any = res.data;
        setProfile({
          id: u.id || "",
          name: u.first_name ? `${u.first_name} ${u.last_name || ''}`.trim() : (u.name || "Student"),
          email: u.email || "",
          phone: u.phone || ""
        });
      }
    }).catch(err => console.error("Failed to fetch profile", err));

    // 2. Fetch Batch Details
    let isMounted = true;
    (async () => {
      try {
        const res = await batchesApi.getBatchById(id);
        if (!isMounted) return;
        if (res.statusCode === 200 && res.data) {
          setBatch(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch batch details", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [id, paymentType, router]);

  const handlePayment = async () => {
    setProcessing(true);

    if (paymentMethod === "whatsapp") {
      const message = `Hello, I would like to manually enroll in a course!

*Course Details:*
Course: ${batch?.course?.title || batch?.name}
Batch: ${batch?.code}
Payment Plan: ${paymentType === 'installment' ? 'Installment (50%)' : 'Full Payment'}
Payable Amount: ৳${payableAmount.toLocaleString()}

*My Information:*
Name: ${profile.name}
Phone: ${profile.phone}
Email: ${profile.email}`;

      window.open(`https://wa.me/01581782193?text=${encodeURIComponent(message)}`, "_blank");
      setProcessing(false);
      return;
    }

    try {
      if (!profile.id || profile.id === "Unknown ID") {
        throw new Error("Student ID is missing or not fully loaded yet. Please wait a moment or re-login.");
      }

      // 1. Create Enrollment
      const enrollRes = await enrollmentsApi.createEnrollment({
        student_id: profile.id,
        batch_id: batch.id,
        total_amount: basePrice,
        discount_amount: finalDiscount,
        installment_count: paymentType === 'installment' ? 2 : 1
      });

      if (![200, 201].includes(enrollRes.statusCode as number) || !enrollRes.data) {
        throw new Error("Failed to create enrollment: " + enrollRes.message);
      }
      
      const enrollment = enrollRes.data;

      // 2. Fetch Installments for this enrollment
      const instRes = await installmentsApi.getAllInstallments({ enrollment_id: enrollment.id });
      if (![200, 201].includes(instRes.statusCode as number) || !instRes.data?.items?.length) {
        throw new Error("No installments found for the created enrollment.");
      }

      // Find first unpaid installment
      const targetInstallment = instRes.data.items.find((i: any) => i.status === "unpaid") || instRes.data.items[0];

      // 3. Initiate Payment via payment gateway
      const paymentRes = await paymentsApi.initiatePayment({
        installment_id: targetInstallment.id,
        amount: targetInstallment.amount
      });
      
      setProcessing(false);
      
      if (paymentRes && paymentRes.data && (paymentRes.data as any).payment_url) {
        window.location.href = (paymentRes.data as any).payment_url;
      } else {
        alert("Payment initiated but no redirect URL received from server.");
        console.log("API Response:", paymentRes);
      }
    } catch (err: any) {
      console.error(err);
      setProcessing(false);
      alert(err.message || "Failed to process enrollment and payment. Please try again.");
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode || !course.id) return;
    setCouponError("");
    setCouponLoading(true);
    try {
      const res = await couponsApi.validateCoupon({ code: couponCode, courseId: course.id });
      if (res.statusCode === 200 && res.data) {
        setAppliedCoupon(res.data);
      } else {
        setCouponError(res.message || "Invalid coupon code");
      }
    } catch (err: any) {
      setCouponError(err.message || "Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0077b6]"></div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Checkout Session Expired</h2>
        <Link href="/" className="px-6 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#002b5b]">
          Return Home
        </Link>
      </div>
    );
  }

  const course = batch.course || {};
  const basePrice = batch.discount_price || 12000;

  // Calculate discount and amounts
  let finalDiscount = 0;
  if (paymentType === 'full' && appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      finalDiscount = (basePrice * appliedCoupon.discountValue) / 100;
    } else {
      finalDiscount = appliedCoupon.discountValue;
    }
  }

  const payableAmount = paymentType === 'installment' ? basePrice / 2 : (basePrice - finalDiscount);
  const dueAmount = paymentType === 'installment' ? basePrice / 2 : 0;
  const platformFee = 0; // Usually free for students, or small gateway charge

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-24 font-sans">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="mb-8">
          <Link href={`/courses/${id}`} className="text-[#0077b6] hover:underline flex items-center gap-2 font-medium mb-4 w-max">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Course
          </Link>
          <h1 className="text-3xl font-black text-[#002b5b]">Secure Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your enrollment to secure your seat.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Column: Forms */}
          <div className="lg:col-span-3 space-y-8">

            {/* Student Info */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-[#0077b6] w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Billing Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                    <input type="text" readOnly value={profile.name} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                    <input type="text" readOnly value={profile.phone} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                  <input type="email" readOnly value={profile.email} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Billing details are pulled securely from your account profile.</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-[#0077b6] w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-[#0077b6] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0077b6]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">Online Payment</p>
                    <p className="text-xs text-gray-500">Cards & Mobile Banking</p>
                  </div>
                </label>

                <label className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'whatsapp' ? 'border-[#0077b6] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'whatsapp'} onChange={() => setPaymentMethod('whatsapp')} />
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">WhatsApp</p>
                    <p className="text-xs text-gray-500">Manual enrollment</p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-[#002b5b]/5 border border-gray-100 sticky top-8">
              <h3 className="text-xl font-black text-[#002b5b] mb-6">Order Summary</h3>

              {/* Course Item */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-16 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                  {(course.thumbnail) ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#002b5b]"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{course.title || batch.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">Batch: {batch.code}</p>
                </div>
              </div>

              {/* Coupon Section */}
              {paymentType === 'full' && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm mb-3">Have a coupon code?</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 font-medium focus:outline-none focus:border-[#0077b6]"
                      disabled={couponLoading || appliedCoupon !== null}
                    />
                    {!appliedCoupon ? (
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode || couponLoading}
                        className="px-5 py-2.5 bg-[#0077b6] text-white rounded-xl text-sm font-bold hover:bg-[#002b5b] disabled:opacity-50 transition-colors"
                      >
                        {couponLoading ? "..." : "Apply"}
                      </button>
                    ) : (
                      <button
                        onClick={handleRemoveCoupon}
                        className="px-5 py-2.5 bg-red-100 text-red-600 rounded-xl text-sm font-bold hover:bg-red-200 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {couponError && <p className="text-xs text-red-600 mt-2 font-medium flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{couponError}</p>}
                  {appliedCoupon && <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Coupon applied successfully!</p>}
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Course Fee</span>
                  <span className="font-medium text-gray-900">৳{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Platform Fee</span>
                  <span className="font-medium text-gray-900">Free</span>
                </div>

                {paymentType === 'full' && appliedCoupon && (
                  <div className="flex justify-between text-green-700 bg-green-50 p-2 rounded-lg">
                    <span className="font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H14a1 1 0 100-2H8.414l1.293-1.293z" clipRule="evenodd" /></svg>
                      Coupon Discount
                    </span>
                    <span className="font-bold">-৳{finalDiscount.toLocaleString()}</span>
                  </div>
                )}

                {paymentType === 'installment' && (
                  <div className="flex justify-between text-green-700 bg-green-50 p-2 rounded-lg">
                    <span className="font-semibold">Paying 1st Installment (50%)</span>
                    <span className="font-bold">৳{payableAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-gray-900 text-lg">Total to Pay</span>
                <span className="text-3xl font-black text-[#0077b6]">৳{payableAmount.toLocaleString()}</span>
              </div>

              {dueAmount > 0 && (
                <div className="mb-6 p-3 bg-orange-50 border border-orange-100 rounded-xl text-center">
                  <p className="text-xs text-orange-800 font-medium">Remaining due of <span className="font-bold">৳{dueAmount.toLocaleString()}</span> will be collected later.</p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={processing || !profile.id}
                className="w-full py-4 bg-gradient-to-r from-[#0077b6] to-[#005f92] hover:from-[#005f92] hover:to-[#004771] text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-[#0077b6]/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {processing
                  ? "Processing..."
                  : paymentMethod === 'online'
                    ? `Pay Securely ৳${payableAmount.toLocaleString()}`
                    : paymentMethod === 'whatsapp'
                      ? "Contact via WhatsApp"
                      : "Confirm Enrollment (Pay Later)"}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium">256-bit SSL Secure Encrypted Payment</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
