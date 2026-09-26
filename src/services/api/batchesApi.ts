"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface BatchItem {
  id: string;
  course_id?: string;
  name: string;
  code: string;
  start_date?: string;
  end_date?: string;
  registration_start?: string;
  registration_end?: string;
  capacity?: number;
  enrolled_count?: number;
  status?: "upcoming" | "ongoing" | "completed" | "cancelled";
  mode?: "online" | "offline" | "hybrid";
  class_type?: "live" | "recorded" | "mixed";
  timezone?: string;
  course?: { id: string; title: string };
  createdAt?: string;
}

export interface PaginatedBatches {
  items: BatchItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateBatchPayload {
  course_id?: string;
  name: string;
  code: string;
  start_date?: string;
  end_date?: string;
  registration_start?: string;
  registration_end?: string;
  capacity?: number;
  status?: string;
  mode?: string;
  class_type?: string;
  timezone?: string;
}

export const batchesApi = {
  async getAllBatches(params?: {
    page?: number;
    limit?: number;
    search?: string;
    course_id?: string;
    status?: string;
    mode?: string;
  }): Promise<ApiResponse<PaginatedBatches>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.search) sp.set("search", params.search);
    if (params?.course_id) sp.set("course_id", params.course_id);
    if (params?.status) sp.set("status", params.status);
    if (params?.mode) sp.set("mode", params.mode);
    const qs = sp.toString();
    return apiFetch<PaginatedBatches>(`/batches${qs ? `?${qs}` : ""}`);
  },

  async getBatchById(id: string): Promise<ApiResponse<BatchItem>> {
    return apiFetch<BatchItem>(`/batches/${id}`);
  },

  async createBatch(payload: CreateBatchPayload): Promise<ApiResponse<BatchItem>> {
    return apiFetch<BatchItem>("/batches", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateBatch(
    id: string,
    payload: Partial<CreateBatchPayload>
  ): Promise<ApiResponse<BatchItem>> {
    return apiFetch<BatchItem>(`/batches/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteBatch(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/batches/${id}`, {
      method: "DELETE",
    });
  },
};
