import { api } from "@/api/axios/instance";

export const getDay = async (config?: AxiosRequestConfig) =>
  api.get<ApiDayResponse>(`/days/current/`, config?.config);
