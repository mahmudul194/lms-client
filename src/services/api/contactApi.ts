import { apiFetch } from "./apiClient";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const contactApi = {
  create: async (payload: CreateContactPayload): Promise<ContactMessage> => {
    const response = await apiFetch<ContactMessage>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response.data as ContactMessage;
  },

  getAll: async (): Promise<ContactMessage[]> => {
    const response = await apiFetch<ContactMessage[]>("/contact");
    return response.data as ContactMessage[];
  },

  updateStatus: async (id: string, status: 'unread' | 'read' | 'archived'): Promise<ContactMessage> => {
    const response = await apiFetch<ContactMessage>(`/contact/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return response.data as ContactMessage;
  },

  delete: async (id: string): Promise<void> => {
    await apiFetch(`/contact/${id}`, { method: "DELETE" });
  },
};
