import { apiFetch } from "./apiClient";

export const noticesApi = {
  getAllNotices: (params?: { skip?: number; limit?: number }) => {
    const qs = params ? `?${new URLSearchParams(params as any).toString()}` : "";
    return apiFetch(`/notices${qs}`, { method: "GET" });
  },
  getActiveNotices: () => apiFetch("/notices/active", { method: "GET" }),
  getNoticeById: (id: string) => apiFetch(`/notices/${id}`, { method: "GET" }),
  createNotice: (data: any) =>
    apiFetch("/notices", { method: "POST", body: data }),
  updateNotice: (id: string, data: any) =>
    apiFetch(`/notices/${id}`, { method: "PATCH", body: data }),
  deleteNotice: (id: string) =>
    apiFetch(`/notices/${id}`, { method: "DELETE" }),
};
