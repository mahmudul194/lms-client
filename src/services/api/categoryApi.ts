"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string | null;
  thumbnail?: string;
  sort_order?: number;
  status?: boolean;
  coursesCount?: number;
  createdAt?: string;
}

export interface PaginatedCategories {
  items: CategoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  slug?: string;
  parent_id?: string;
  thumbnail?: string;
  sort_order?: number;
  status?: boolean;
}

export const categoryApi = {
  async getAllCategories(params?: {
    page?: number;
    limit?: number;
    search?: string;
    parent_id?: string;
  }): Promise<ApiResponse<PaginatedCategories>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.search) sp.set("search", params.search);
    if (params?.parent_id) sp.set("parent_id", params.parent_id);
    const qs = sp.toString();
    const res = await apiFetch<PaginatedCategories>(`/course-categories${qs ? `?${qs}` : ""}`);
    if (res.statusCode === 404 || res.statusCode === 503) {
      return apiFetch<PaginatedCategories>(`/category${qs ? `?${qs}` : ""}`);
    }
    return res;
  },

  async getCategoryById(id: string): Promise<ApiResponse<CategoryItem>> {
    const res = await apiFetch<CategoryItem>(`/course-categories/${id}`);
    if (res.statusCode === 404) return apiFetch<CategoryItem>(`/category/${id}`);
    return res;
  },

  async createCategory(payload: CreateCategoryPayload): Promise<ApiResponse<CategoryItem>> {
    return apiFetch<CategoryItem>("/course-categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateCategory(
    id: string,
    payload: Partial<CreateCategoryPayload>
  ): Promise<ApiResponse<CategoryItem>> {
    return apiFetch<CategoryItem>(`/course-categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteCategory(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/course-categories/${id}`, {
      method: "DELETE",
    });
  },
};
