"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  coursesCount?: number;
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
}

export const categoryApi = {
  async getAllCategories(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedCategories>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.search) sp.set("search", params.search);
    const qs = sp.toString();
    return apiFetch<PaginatedCategories>(`/category${qs ? `?${qs}` : ""}`);
  },

  async getCategoryById(id: string): Promise<ApiResponse<CategoryItem>> {
    return apiFetch<CategoryItem>(`/category/${id}`);
  },

  async createCategory(payload: CreateCategoryPayload): Promise<ApiResponse<CategoryItem>> {
    return apiFetch<CategoryItem>("/category", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateCategory(
    id: string,
    payload: Partial<CreateCategoryPayload>
  ): Promise<ApiResponse<CategoryItem>> {
    return apiFetch<CategoryItem>(`/category/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteCategory(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/category/${id}`, {
      method: "DELETE",
    });
  },
};
