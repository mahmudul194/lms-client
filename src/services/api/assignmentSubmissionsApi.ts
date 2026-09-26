"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface SubmissionItem {
  id: string;
  assignmentId: string;
  studentId?: string;
  answer?: string;
  fileUrl?: string;
  marks?: number;
  feedback?: string;
  status: "submitted" | "reviewed" | "rejected";
  submittedAt?: string;
  reviewedAt?: string;
  student?: { id: string; name: string; email: string };
  assignment?: { id: string; title: string; totalMarks: number };
}

export interface PaginatedSubmissions {
  items: SubmissionItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SubmitAssignmentPayload {
  assignmentId: string;
  studentId?: string;
  answer?: string;
  fileUrl?: string;
}

export interface ReviewSubmissionPayload {
  marks: number;
  feedback?: string;
}

export const assignmentSubmissionsApi = {
  async getAllSubmissions(params?: {
    assignmentId?: string;
    studentId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedSubmissions>> {
    const sp = new URLSearchParams();
    if (params?.assignmentId) sp.set("assignmentId", params.assignmentId);
    if (params?.studentId) sp.set("studentId", params.studentId);
    if (params?.status) sp.set("status", params.status);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedSubmissions>(`/assignment-submissions${qs ? `?${qs}` : ""}`);
  },

  async getSubmissionById(id: string): Promise<ApiResponse<SubmissionItem>> {
    return apiFetch<SubmissionItem>(`/assignment-submissions/${id}`);
  },

  async submitAssignment(payload: SubmitAssignmentPayload): Promise<ApiResponse<SubmissionItem>> {
    return apiFetch<SubmissionItem>("/assignment-submissions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateSubmission(
    id: string,
    payload: Partial<SubmitAssignmentPayload>
  ): Promise<ApiResponse<SubmissionItem>> {
    return apiFetch<SubmissionItem>(`/assignment-submissions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async reviewSubmission(
    id: string,
    payload: ReviewSubmissionPayload
  ): Promise<ApiResponse<SubmissionItem>> {
    return apiFetch<SubmissionItem>(`/assignment-submissions/${id}/review`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteSubmission(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/assignment-submissions/${id}`, {
      method: "DELETE",
    });
  },
};
