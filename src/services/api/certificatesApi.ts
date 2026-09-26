"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface CertificateItem {
  id: string;
  studentId: string;
  batchId?: string;
  courseId?: string;
  studentName: string;
  courseName: string;
  batchNumber?: string;
  certificateNumber?: string;
  issueDate: string;
  certificateUrl?: string;
  status: "issued" | "revoked";
  student?: { id: string; name: string; roll?: string };
  createdAt?: string;
}

export interface PaginatedCertificates {
  items: CertificateItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCertificatePayload {
  studentId: string;
  batchId?: string;
  courseId?: string;
  studentName: string;
  courseName: string;
  batchNumber?: string;
  issueDate?: string;
  certificateUrl?: string;
  signature1Name?: string;
  signature1Designation?: string;
  status?: string;
}

export const certificatesApi = {
  async getAllCertificates(params?: {
    studentId?: string;
    batchId?: string;
    courseId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedCertificates>> {
    const sp = new URLSearchParams();
    if (params?.studentId) sp.set("studentId", params.studentId);
    if (params?.batchId) sp.set("batchId", params.batchId);
    if (params?.courseId) sp.set("courseId", params.courseId);
    if (params?.status) sp.set("status", params.status);
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    const qs = sp.toString();
    return apiFetch<PaginatedCertificates>(`/certificates${qs ? `?${qs}` : ""}`);
  },

  async getCertificateById(id: string): Promise<ApiResponse<CertificateItem>> {
    return apiFetch<CertificateItem>(`/certificates/${id}`);
  },

  async createCertificate(payload: CreateCertificatePayload): Promise<ApiResponse<CertificateItem>> {
    return apiFetch<CertificateItem>("/certificates", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async createBulkCertificates(
    certificates: CreateCertificatePayload[]
  ): Promise<ApiResponse<CertificateItem[]>> {
    return apiFetch<CertificateItem[]>("/certificates/bulk", {
      method: "POST",
      body: JSON.stringify({ certificates }),
    });
  },

  async updateCertificate(
    id: string,
    payload: Partial<CreateCertificatePayload>
  ): Promise<ApiResponse<CertificateItem>> {
    return apiFetch<CertificateItem>(`/certificates/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteCertificate(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/certificates/${id}`, {
      method: "DELETE",
    });
  },
};
