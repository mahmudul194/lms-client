"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface MentorUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  isBanned?: boolean;
}

export interface MentorItem {
  id: string;
  designation: string;
  subject: string;
  bio?: string;
  profileImage?: string;
  expertise?: string[];
  skills?: string[];
  experience?: string;
  facebook?: string;
  linkedin?: string;
  user?: MentorUser;
}

export interface PaginatedMentors {
  items: MentorItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateMentorPayload {
  userId?: string;
  designation: string;
  subject: string;
  bio?: string;
  profileImage?: string;
  expertise?: string[];
  skills?: string[];
  experience?: string;
  facebook?: string;
  linkedin?: string;
}

export const mentorsApi = {
  async getAllMentors(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedMentors>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.search) sp.set("search", params.search);
    const qs = sp.toString();
    return apiFetch<PaginatedMentors>(`/mentors${qs ? `?${qs}` : ""}`);
  },

  async getMentorById(id: string): Promise<ApiResponse<MentorItem>> {
    return apiFetch<MentorItem>(`/mentors/${id}`);
  },

  async createMentor(payload: CreateMentorPayload): Promise<ApiResponse<MentorItem>> {
    return apiFetch<MentorItem>("/mentors", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateMentor(
    id: string,
    payload: Partial<CreateMentorPayload>
  ): Promise<ApiResponse<MentorItem>> {
    return apiFetch<MentorItem>(`/mentors/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async banMentor(id: string): Promise<ApiResponse<{ id: string; user: { isBanned: boolean } }>> {
    return apiFetch(`/mentors/${id}/ban`, {
      method: "PATCH",
    });
  },

  async unbanMentor(id: string): Promise<ApiResponse<{ id: string; user: { isBanned: boolean } }>> {
    return apiFetch(`/mentors/${id}/unban`, {
      method: "PATCH",
    });
  },

  async deleteMentor(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/mentors/${id}`, {
      method: "DELETE",
    });
  },
};
