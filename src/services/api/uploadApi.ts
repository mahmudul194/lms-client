"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface UploadResponseData {
  url: string;
  filename: string;
}

export const uploadApi = {
  async uploadFile(file: File): Promise<ApiResponse<UploadResponseData>> {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<UploadResponseData>("/upload", {
      method: "POST",
      body: formData,
    });
  },
};
