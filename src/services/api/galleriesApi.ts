import { apiFetch } from "./apiClient";

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  batch?: any;
  createdAt?: string;
  updatedAt?: string;
}

export const galleriesApi = {
  getAllGalleries: async () => {
    return apiFetch<GalleryItem[]>("/galleries");
  },

  getGalleryById: async (id: string) => {
    return apiFetch<GalleryItem>(`/galleries/${id}`);
  },

  createGallery: async (data: Partial<GalleryItem>) => {
    return apiFetch<GalleryItem>("/galleries", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateGallery: async (id: string, data: Partial<GalleryItem>) => {
    return apiFetch<GalleryItem>(`/galleries/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteGallery: async (id: string) => {
    return apiFetch<void>(`/galleries/${id}`, {
      method: "DELETE",
    });
  },
};
