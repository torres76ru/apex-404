import { api } from "@/api/axios/instance";

export const getUserReports = async ({ config }: AxiosRequestConfig) =>
  api.get<ApiReportsResponse>(`/user/reports`, config);
