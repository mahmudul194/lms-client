import { apiFetch } from "./apiClient";

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  link?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const portfoliosApi = {
  getAllPortfolios: async () => {
    return apiFetch<PortfolioItem[]>("/portfolios");
  },

  getPortfolioById: async (id: string) => {
    return apiFetch<PortfolioItem>(`/portfolios/${id}`);
  },

  createPortfolio: async (data: Partial<PortfolioItem>) => {
    return apiFetch<PortfolioItem>("/portfolios", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updatePortfolio: async (id: string, data: Partial<PortfolioItem>) => {
    return apiFetch<PortfolioItem>(`/portfolios/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deletePortfolio: async (id: string) => {
    return apiFetch<void>(`/portfolios/${id}`, {
      method: "DELETE",
    });
  },
};
