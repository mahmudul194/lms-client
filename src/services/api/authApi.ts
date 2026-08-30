"use client";

import { apiFetch, ApiResponse, setAuthToken, clearAuthToken } from "./apiClient";

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role: string;
}

export interface AuthSuccessData {
  accessToken: string;
  user: AuthUser;
}

export const authApi = {
  async sendOtp(phone: string): Promise<ApiResponse<{ statusCode: number; message: string }>> {
    return apiFetch("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
  },

  async verifyOtp(phone: string, otpCode: string, device = "Web Browser"): Promise<ApiResponse<AuthSuccessData>> {
    const res = await apiFetch<AuthSuccessData>("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otpCode, device }),
    });
    if (res.statusCode === 200 && res.data?.accessToken) {
      setAuthToken(res.data.accessToken);
    }
    return res;
  },

  async login(email: string, password: string, device = "Web Browser"): Promise<ApiResponse<AuthSuccessData>> {
    const res = await apiFetch<AuthSuccessData>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, device }),
    });
    if (res.statusCode === 200 && res.data?.accessToken) {
      setAuthToken(res.data.accessToken);
    }
    return res;
  },

  async forgotPassword(phone: string): Promise<ApiResponse> {
    return apiFetch("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
  },

  async resetPassword(phone: string, otpCode: string, newPassword: string): Promise<ApiResponse> {
    return apiFetch("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ phone, otpCode, newPassword }),
    });
  },

  async getMe(): Promise<ApiResponse<AuthUser>> {
    return apiFetch<AuthUser>("/auth/me", {
      method: "GET",
    });
  },

  async logout(device?: string): Promise<ApiResponse> {
    const res = await apiFetch("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ device }),
    });
    clearAuthToken();
    return res;
  },

  async logoutAll(): Promise<ApiResponse> {
    const res = await apiFetch("/auth/logout-all", {
      method: "POST",
    });
    clearAuthToken();
    return res;
  },
};
