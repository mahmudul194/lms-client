"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  institute?: string;
  department?: string;
  technology?: string;
  semester?: number;
  shift?: string;
  session?: string;
  roll?: string;
  registrationNumber?: string;
  presentAddress?: string;
  permanentAddress?: string;
  district?: string;
  division?: string;
  skills?: string[];
  interestedField?: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
  industrialAttachment?: boolean;
  attachmentCompany?: string;
  attachmentStatus?: string;
  profileImage?: string;
  user?: { id: string; name: string; email: string; isBanned?: boolean };
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedStudents {
  items: StudentRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type CreateStudentPayload = Partial<Omit<StudentRecord, "id" | "user" | "createdAt" | "updatedAt">> & {
  name: string;
  email: string;
};

export const studentsApi = {
  async getAllStudents(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedStudents>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.search) sp.set("search", params.search);
    const qs = sp.toString();
    return apiFetch<PaginatedStudents>(`/students${qs ? `?${qs}` : ""}`);
  },

  async getStudentById(id: string): Promise<ApiResponse<StudentRecord>> {
    return apiFetch<StudentRecord>(`/students/${id}`);
  },

  async createStudent(payload: CreateStudentPayload | FormData): Promise<ApiResponse<StudentRecord>> {
    const isForm = payload instanceof FormData;
    return apiFetch<StudentRecord>("/students", {
      method: "POST",
      body: isForm ? payload : JSON.stringify(payload),
    });
  },

  async updateStudent(
    id: string,
    payload: Partial<CreateStudentPayload> | FormData
  ): Promise<ApiResponse<StudentRecord>> {
    const isForm = payload instanceof FormData;
    return apiFetch<StudentRecord>(`/students/${id}`, {
      method: "PATCH",
      body: isForm ? payload : JSON.stringify(payload),
    });
  },

  async banStudent(id: string): Promise<ApiResponse<{ id: string; user: { isBanned: boolean } }>> {
    return apiFetch(`/students/${id}/ban`, {
      method: "PATCH",
    });
  },

  async unbanStudent(id: string): Promise<ApiResponse<{ id: string; user: { isBanned: boolean } }>> {
    return apiFetch(`/students/${id}/unban`, {
      method: "PATCH",
    });
  },

  async deleteStudent(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/students/${id}`, {
      method: "DELETE",
    });
  },
};
