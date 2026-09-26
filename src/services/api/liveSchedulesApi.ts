"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface LiveScheduleItem {
  id: string;
  batchId?: string;
  mentorId?: string;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  platform: "google_meet" | "zoom" | "youtube";
  meetingUrl: string;
  meetingId?: string;
  meetingPassword?: string;
  status: "scheduled" | "live" | "completed" | "cancelled";
  batch?: { id: string; name: string; code: string };
  mentor?: { id: string; user?: { name: string } };
  createdAt?: string;
}

export interface PaginatedLiveSchedules {
  items: LiveScheduleItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateLiveSchedulePayload {
  batchId?: string;
  mentorId?: string;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  platform?: string;
  meetingUrl: string;
  meetingId?: string;
  meetingPassword?: string;
  status?: string;
}

export const liveSchedulesApi = {
  async getAllLiveSchedules(params?: {
    batchId?: string;
    mentorId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedLiveSchedules>> {
    const sp = new URLSearchParams();
    if (params?.batchId) sp.set("batchId", params.batchId);
    if (params?.mentorId) sp.set("mentorId", params.mentorId);
    if (params?.status) sp.set("status", params.status);
    if (params?.search) sp.set("search", params.search);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedLiveSchedules>(`/live-schedules${qs ? `?${qs}` : ""}`);
  },

  async getLiveScheduleById(id: string): Promise<ApiResponse<LiveScheduleItem>> {
    return apiFetch<LiveScheduleItem>(`/live-schedules/${id}`);
  },

  async createLiveSchedule(
    payload: CreateLiveSchedulePayload
  ): Promise<ApiResponse<LiveScheduleItem>> {
    return apiFetch<LiveScheduleItem>("/live-schedules", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateLiveSchedule(
    id: string,
    payload: Partial<CreateLiveSchedulePayload>
  ): Promise<ApiResponse<LiveScheduleItem>> {
    return apiFetch<LiveScheduleItem>(`/live-schedules/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteLiveSchedule(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/live-schedules/${id}`, {
      method: "DELETE",
    });
  },
};
