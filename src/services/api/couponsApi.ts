"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface CouponItem {
  id: string;
  code: string;
  courseId?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate?: string;
  endDate?: string;
  usageLimit?: number;
  usedCount?: number;
  isActive: boolean;
  createdAt?: string;
}

export interface ValidateCouponPayload {
  code: string;
  courseId?: string;
}

export interface ValidatedCouponData {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

export const couponsApi = {
  async getAllCoupons(): Promise<ApiResponse<CouponItem[]>> {
    return apiFetch<CouponItem[]>("/coupons");
  },

  async getCouponById(id: string): Promise<ApiResponse<CouponItem>> {
    return apiFetch<CouponItem>(`/coupons/${id}`);
  },

  async validateCoupon(payload: ValidateCouponPayload): Promise<ApiResponse<ValidatedCouponData>> {
    return apiFetch<ValidatedCouponData>("/coupons/validate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async createCoupon(payload: Partial<CouponItem>): Promise<ApiResponse<CouponItem>> {
    return apiFetch<CouponItem>("/coupons", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateCoupon(id: string, payload: Partial<CouponItem>): Promise<ApiResponse<CouponItem>> {
    return apiFetch<CouponItem>(`/coupons/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteCoupon(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/coupons/${id}`, {
      method: "DELETE",
    });
  },
};
