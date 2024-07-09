import { api } from "../../instance";

export const fetchAuthToken = async ({ config }: AxiosRequestConfig) =>
  api.post<ApiTokenResponse>(`/auth`, config);
