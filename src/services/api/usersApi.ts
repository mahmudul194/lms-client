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

  async getAllUsers(): Promise<ApiResponse<UserRecord[]>> {
    return apiFetch<UserRecord[]>("/users", {
      method: "GET",
    });
  },

  async getUserById(id: string): Promise<ApiResponse<UserRecord>> {
    return apiFetch<UserRecord>(`/users/${id}`, {
      method: "GET",
    });
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
