"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface PaymentTransactionItem {
  id: string;
  transaction_id: string;
  enrollment_id?: string;
  installment_id?: string;
  student_id?: string;
  amount: number;
  currency: string;
  status: "PENDING" | "VALID" | "FAILED" | "CANCELLED";
  payment_method?: string;
  card_type?: string;
  bank_tran_id?: string;
  student?: { id: string; name: string; email: string };
  createdAt?: string;
}

export interface PaginatedPayments {
  items: PaymentTransactionItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InitiatePaymentPayload {
  installment_id: string;
  amount: number;
}

export interface InitiatePaymentResponse {
  payment_url?: string;
  gateway_url?: string;
  transaction_id: string;
  payment_id?: string;
  sessionkey?: string;
}

export const paymentsApi = {
  async initiatePayment(
    payload: InitiatePaymentPayload
  ): Promise<ApiResponse<InitiatePaymentResponse>> {
    return apiFetch<InitiatePaymentResponse>("/payments/initiate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getAllPayments(params?: {
    page?: number;
    limit?: number;
    status?: string;
    enrollment_id?: string;
    installment_id?: string;
    student_id?: string;
  }): Promise<ApiResponse<PaginatedPayments>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.status) sp.set("status", params.status);
    if (params?.enrollment_id) sp.set("enrollment_id", params.enrollment_id);
    if (params?.installment_id) sp.set("installment_id", params.installment_id);
    if (params?.student_id) sp.set("student_id", params.student_id);
    const qs = sp.toString();
    return apiFetch<PaginatedPayments>(`/payments${qs ? `?${qs}` : ""}`);
  },

  async getPaymentById(id: string): Promise<ApiResponse<PaymentTransactionItem>> {
    return apiFetch<PaymentTransactionItem>(`/payments/${id}`);
  },
};
