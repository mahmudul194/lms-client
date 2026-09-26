"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface ResourceItem {
  id: string;
  batchId?: string;
  title: string;
  description?: string;
  url?: string;
  pdf?: string;
  link?: string;
  sizeMb?: number;
  batch?: { id: string; name: string; code: string };
  createdAt?: string;
}

export interface PaginatedResources {
  items: ResourceItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateResourcePayload {
  batchId?: string;
  title: string;
  description?: string;
  url?: string;
  pdf?: string;
  link?: string;
  sizeMb?: number;
}

export const resourcesApi = {
  async getAllResources(params?: {
    batchId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedResources>> {
    const sp = new URLSearchParams();
    if (params?.batchId) sp.set("batchId", params.batchId);
    if (params?.search) sp.set("search", params.search);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedResources>(`/resources${qs ? `?${qs}` : ""}`);
  },

  async getResourceById(id: string): Promise<ApiResponse<ResourceItem>> {
    return apiFetch<ResourceItem>(`/resources/${id}`);
  },

  async createResource(payload: CreateResourcePayload): Promise<ApiResponse<ResourceItem>> {
    return apiFetch<ResourceItem>("/resources", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateResource(
    id: string,
    payload: Partial<CreateResourcePayload>
  ): Promise<ApiResponse<ResourceItem>> {
    return apiFetch<ResourceItem>(`/resources/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteResource(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/resources/${id}`, {
      method: "DELETE",
    });
  },
};
