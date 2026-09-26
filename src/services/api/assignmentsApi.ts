"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface AssignmentItem {
  id: string;
  batchId?: string;
  mentorId?: string;
  title: string;
  description?: string;
  attachmentUrl?: string;
  totalMarks: number;
  dueAt: string;
  status: "draft" | "published" | "closed";
  batch?: { id: string; name: string; code: string };
  createdAt?: string;
}

export interface PaginatedAssignments {
  items: AssignmentItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateAssignmentPayload {
  batchId: string;
  mentorId?: string;
  title: string;
  description?: string;
  attachmentUrl?: string;
  totalMarks: number;
  dueAt: string;
  status?: string;
}

export const assignmentsApi = {
  async getAllAssignments(params?: {
    batchId?: string;
    mentorId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedAssignments>> {
    const sp = new URLSearchParams();
    if (params?.batchId) sp.set("batchId", params.batchId);
    if (params?.mentorId) sp.set("mentorId", params.mentorId);
    if (params?.status) sp.set("status", params.status);
    if (params?.search) sp.set("search", params.search);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedAssignments>(`/assignments${qs ? `?${qs}` : ""}`);
  },

  async getAssignmentById(id: string): Promise<ApiResponse<AssignmentItem>> {
    return apiFetch<AssignmentItem>(`/assignments/${id}`);
  },

  async createAssignment(payload: CreateAssignmentPayload): Promise<ApiResponse<AssignmentItem>> {
    return apiFetch<AssignmentItem>("/assignments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateAssignment(
    id: string,
    payload: Partial<CreateAssignmentPayload>
  ): Promise<ApiResponse<AssignmentItem>> {
    return apiFetch<AssignmentItem>(`/assignments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteAssignment(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/assignments/${id}`, {
      method: "DELETE",
    });
  },
};
