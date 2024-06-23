import { api } from "@/api/axios/instance";

export const getUserReport = async ({ config }: AxiosRequestConfig) =>
  api.get<ApiReportResponse>(`/user/report`, config);
