"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface LessonItem {
  id: string;
  module_id: string;
  title: string;
  slug?: string;
  description?: string;
  type?: "video" | "document" | "quiz" | "assignment" | "live";
  video_url?: string;
  pdf_url?: string;
  duration?: number;
  order: number;
  is_preview?: boolean;
  status: "draft" | "published" | "archived";
  createdAt?: string;
}

export interface PaginatedLessons {
  items: LessonItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateLessonPayload {
  module_id: string;
  title: string;
  slug?: string;
  description?: string;
  type?: string;
  video_url?: string;
  pdf_url?: string;
  duration?: number;
  order?: number;
  is_preview?: boolean;
  status?: string;
}

export const lessonsApi = {
  async getAllLessons(params?: {
    module_id?: string;
    status?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedLessons>> {
    const sp = new URLSearchParams();
    if (params?.module_id) sp.set("module_id", params.module_id);
    if (params?.status) sp.set("status", params.status);
    if (params?.type) sp.set("type", params.type);
    if (params?.search) sp.set("search", params.search);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedLessons>(`/lessons${qs ? `?${qs}` : ""}`);
  },

  async getLessonById(id: string): Promise<ApiResponse<LessonItem>> {
    return apiFetch<LessonItem>(`/lessons/${id}`);
  },

  async createLesson(payload: CreateLessonPayload): Promise<ApiResponse<LessonItem>> {
    return apiFetch<LessonItem>("/lessons", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateLesson(
    id: string,
    payload: Partial<CreateLessonPayload>
  ): Promise<ApiResponse<LessonItem>> {
    return apiFetch<LessonItem>(`/lessons/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteLesson(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/lessons/${id}`, {
      method: "DELETE",
    });
  },
};
