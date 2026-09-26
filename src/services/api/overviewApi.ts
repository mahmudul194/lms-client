import { apiFetch } from "./apiClient";

export interface AdminOverviewReport {
  totalRevenue: number;
  totalDues: number;
  totalEnrollments: number;
}

export interface StudentOverviewReport {
  totalPayable: number;
  totalPaid: number;
  totalDue: number;
  upcomingInstallments: any[];
  paymentHistory: any[];
}

export const overviewApi = {
  getAdminOverview: async (params?: { startDate?: string; endDate?: string }): Promise<AdminOverviewReport> => {
    const sp = new URLSearchParams();
    if (params?.startDate) sp.set("startDate", params.startDate);
    if (params?.endDate) sp.set("endDate", params.endDate);
    const qs = sp.toString();
    const response = await apiFetch<AdminOverviewReport>(`/overview/admin${qs ? `?${qs}` : ""}`);
    return (response.data || {}) as AdminOverviewReport;
  },

  getStudentOverview: async (): Promise<StudentOverviewReport> => {
    const response = await apiFetch<StudentOverviewReport>("/overview/student");
    return response.data as StudentOverviewReport;
  },
};
