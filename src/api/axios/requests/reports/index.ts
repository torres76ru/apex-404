import { api } from "@/api/axios/instance";

export interface GetReportsByDayParams {
  day: string;
}

export type GetReportsByDayConfig = AxiosRequestConfig<GetReportsByDayParams>;

export const getReportsByDay = async ({
  params,
  config
}: GetReportsByDayConfig) =>
  api.get<ApiReportsResponse>(`/reports/${params.day}/`, config);
