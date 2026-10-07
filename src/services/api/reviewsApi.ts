import { apiFetch } from "./apiClient";

export interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  student?: any;
  batch?: any;
  createdAt?: string;
  updatedAt?: string;
}

export const reviewsApi = {
  getAllReviews: async () => {
    return apiFetch<ReviewItem[]>("/reviews");
  },

  getReviewById: async (id: string) => {
    return apiFetch<ReviewItem>(`/reviews/${id}`);
  },

  createReview: async (data: Partial<ReviewItem>) => {
    return apiFetch<ReviewItem>("/reviews", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateReview: async (id: string, data: Partial<ReviewItem>) => {
    return apiFetch<ReviewItem>(`/reviews/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteReview: async (id: string) => {
    return apiFetch<void>(`/reviews/${id}`, {
      method: "DELETE",
    });
  },
};
