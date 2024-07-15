import { api } from "@/api/axios/instance";

export const getUsers = async ({ config }: AxiosRequestConfig) =>
  api.get<ApiUsersResponse>(`/users/`, config);
