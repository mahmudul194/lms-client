import { apiFetch } from "./apiClient";

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const blogsApi = {
  getAllBlogs: async () => {
    return apiFetch<BlogItem[]>("/blogs");
  },

  getBlogById: async (id: string) => {
    return apiFetch<BlogItem>(`/blogs/${id}`);
  },

  createBlog: async (data: Partial<BlogItem>) => {
    return apiFetch<BlogItem>("/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateBlog: async (id: string, data: Partial<BlogItem>) => {
    return apiFetch<BlogItem>(`/blogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteBlog: async (id: string) => {
    return apiFetch<void>(`/blogs/${id}`, {
      method: "DELETE",
    });
  },
};
