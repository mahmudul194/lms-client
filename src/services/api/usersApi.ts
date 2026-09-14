"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isBanned?: boolean;
  bannedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedUsers {
  items: UserRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role?: string;
}

export const usersApi = {
  async createUser(payload: CreateUserPayload): Promise<ApiResponse<UserRecord>> {
    return apiFetch<UserRecord>("/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedUsers | UserRecord[]>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.search) sp.set("search", params.search);
    const qs = sp.toString();
    return apiFetch<PaginatedUsers | UserRecord[]>(`/users${qs ? `?${qs}` : ""}`);
  },

  async getUserById(id: string): Promise<ApiResponse<UserRecord>> {
    return apiFetch<UserRecord>(`/users/${id}`);
  },

  async updateUser(id: string, payload: Partial<CreateUserPayload>): Promise<ApiResponse<UserRecord>> {
    return apiFetch<UserRecord>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteUser(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/users/${id}`, {
      method: "DELETE",
    });
  },

  async banUser(id: string): Promise<ApiResponse<UserRecord>> {
    return apiFetch<UserRecord>(`/users/${id}/ban`, {
      method: "PATCH",
    });
  },

  async unbanUser(id: string): Promise<ApiResponse<UserRecord>> {
    return apiFetch<UserRecord>(`/users/${id}/unban`, {
      method: "PATCH",
    });
  },
};
