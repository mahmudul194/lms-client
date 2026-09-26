"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface EnrollmentItem {
  id: string;
  student_id: string;
  batch_id: string;
  total_amount: number;
  discount_amount?: number;
  paid_amount?: number;
  status: "pending" | "active" | "completed" | "cancelled";
  installment_count?: number;
  student?: { id: string; name: string; email: string; phone?: string };
  batch?: { id: string; name: string; code: string; course?: { title: string } };
  createdAt?: string;
}

export interface PaginatedEnrollments {
  items: EnrollmentItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateEnrollmentPayload {
  student_id: string;
  batch_id: string;
  total_amount: number;
  discount_amount?: number;
  installment_count?: number;
  installment_due_dates?: string[];
}

export interface ManualEnrollmentPayload {
  student_id: string;
  batch_id: string;
  total_amount: number;
  discount_amount?: number;
  paid_amount: number;
  transaction_id?: string;
}

export const enrollmentsApi = {
  async getAllEnrollments(params?: {
    student_id?: string;
    batch_id?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedEnrollments>> {
    const sp = new URLSearchParams();
    if (params?.student_id) sp.set("student_id", params.student_id);
    if (params?.batch_id) sp.set("batch_id", params.batch_id);
    if (params?.status) sp.set("status", params.status);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedEnrollments>(`/enrollments${qs ? `?${qs}` : ""}`);
  },

  async getEnrollmentById(id: string): Promise<ApiResponse<EnrollmentItem>> {
    return apiFetch<EnrollmentItem>(`/enrollments/${id}`);
  },

  async createEnrollment(payload: CreateEnrollmentPayload): Promise<ApiResponse<EnrollmentItem>> {
    return apiFetch<EnrollmentItem>("/enrollments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async manualEnrollment(payload: ManualEnrollmentPayload): Promise<ApiResponse<EnrollmentItem>> {
    return apiFetch<EnrollmentItem>("/enrollments/manual", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateEnrollment(
    id: string,
    payload: Partial<CreateEnrollmentPayload>
  ): Promise<ApiResponse<EnrollmentItem>> {
    return apiFetch<EnrollmentItem>(`/enrollments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteEnrollment(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/enrollments/${id}`, {
      method: "DELETE",
    });
  },
};
