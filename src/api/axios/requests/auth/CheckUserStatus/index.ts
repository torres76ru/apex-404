import { api } from "@/api/axios/instance";

export const postCheckUserStatus = async ({ config }: AxiosRequestConfig) =>
  api.post<ApiStatusResponse>(`/auth/status`, config);
