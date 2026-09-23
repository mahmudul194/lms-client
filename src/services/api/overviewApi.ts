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
  getAdminOverview: async (): Promise<AdminOverviewReport> => {
    const response = await apiFetch<AdminOverviewReport>("/overview/admin");
    return response.data as AdminOverviewReport;
  },

  getStudentOverview: async (): Promise<StudentOverviewReport> => {
    const response = await apiFetch<StudentOverviewReport>("/overview/student");
    return response.data as StudentOverviewReport;
  },
};
