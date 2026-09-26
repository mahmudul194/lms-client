"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface CourseModuleItem {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  order: number;
  status: "draft" | "published" | "archived";
  lessonsCount?: number;
  createdAt?: string;
}

export interface PaginatedModules {
  items: CourseModuleItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateModulePayload {
  course_id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  order?: number;
  status?: string;
}

export const modulesApi = {
  async getAllModules(params?: {
    course_id?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedModules>> {
    const sp = new URLSearchParams();
    if (params?.course_id) sp.set("course_id", params.course_id);
    if (params?.status) sp.set("status", params.status);
    if (params?.search) sp.set("search", params.search);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedModules>(`/modules${qs ? `?${qs}` : ""}`);
  },

  async getModuleById(id: string): Promise<ApiResponse<CourseModuleItem>> {
    return apiFetch<CourseModuleItem>(`/modules/${id}`);
  },

  async createModule(payload: CreateModulePayload): Promise<ApiResponse<CourseModuleItem>> {
    return apiFetch<CourseModuleItem>("/modules", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateModule(
    id: string,
    payload: Partial<CreateModulePayload>
  ): Promise<ApiResponse<CourseModuleItem>> {
    return apiFetch<CourseModuleItem>(`/modules/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteModule(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/modules/${id}`, {
      method: "DELETE",
    });
  },
};
