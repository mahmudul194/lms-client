"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  category_id?: string;
  course_code?: string;
  short_description?: string;
  description?: string;
  thumbnail?: string;
  intro_video_url?: string;
  level?: "beginner" | "intermediate" | "advanced" | "all_levels";
  language?: string;
  duration?: number;
  duration_unit?: "hours" | "days" | "weeks" | "months" | "years";
  price: number;
  discount_price?: number;
  status?: "draft" | "published" | "archived" | "upcoming";
  visibility?: "public" | "private" | "unlisted";
  mentor_ids?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedCourses {
  items: CourseItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCoursePayload {
  title: string;
  slug?: string;
  category_id?: string;
  course_code?: string;
  short_description?: string;
  description?: string;
  thumbnail?: string;
  intro_video_url?: string;
  level?: string;
  language?: string;
  duration?: number;
  duration_unit?: string;
  price: number;
  discount_price?: number;
  status?: string;
  visibility?: string;
  mentor_ids?: string[];
}

export const coursesApi = {
  async getAllCourses(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category_id?: string;
    status?: string;
    level?: string;
  }): Promise<ApiResponse<PaginatedCourses>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.search) sp.set("search", params.search);
    if (params?.category_id) sp.set("category_id", params.category_id);
    if (params?.status) sp.set("status", params.status);
    if (params?.level) sp.set("level", params.level);
    const qs = sp.toString();
    return apiFetch<PaginatedCourses>(`/courses${qs ? `?${qs}` : ""}`);
  },

  async getCourseById(id: string): Promise<ApiResponse<CourseItem>> {
    return apiFetch<CourseItem>(`/courses/${id}`);
  },

  async createCourse(payload: CreateCoursePayload): Promise<ApiResponse<CourseItem>> {
    return apiFetch<CourseItem>("/courses", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateCourse(
    id: string,
    payload: Partial<CreateCoursePayload>
  ): Promise<ApiResponse<CourseItem>> {
    return apiFetch<CourseItem>(`/courses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteCourse(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/courses/${id}`, {
      method: "DELETE",
    });
  },
};
