"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface InstallmentItem {
  id: string;
  enrollment_id: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  status: "unpaid" | "paid" | "overdue";
  installment_number?: number;
  transaction_id?: string;
  enrollment?: {
    id: string;
    student?: { name: string; email: string };
    batch?: { name: string; course?: { title: string } };
  };
  createdAt?: string;
}

export interface PaginatedInstallments {
  items: InstallmentItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateInstallmentPayload {
  enrollment_id: string;
  amount: number;
  due_date: string;
}

export const installmentsApi = {
  async getAllInstallments(params?: {
    enrollment_id?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedInstallments>> {
    const sp = new URLSearchParams();
    if (params?.enrollment_id) sp.set("enrollment_id", params.enrollment_id);
    if (params?.status) sp.set("status", params.status);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedInstallments>(`/installments${qs ? `?${qs}` : ""}`);
  },

  async getInstallmentById(id: string): Promise<ApiResponse<InstallmentItem>> {
    return apiFetch<InstallmentItem>(`/installments/${id}`);
  },

  async createInstallment(payload: CreateInstallmentPayload): Promise<ApiResponse<InstallmentItem>> {
    return apiFetch<InstallmentItem>("/installments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateInstallment(
    id: string,
    payload: Partial<CreateInstallmentPayload & { status: string; paid_date: string }>
  ): Promise<ApiResponse<InstallmentItem>> {
    return apiFetch<InstallmentItem>(`/installments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteInstallment(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/installments/${id}`, {
      method: "DELETE",
    });
  },
};
