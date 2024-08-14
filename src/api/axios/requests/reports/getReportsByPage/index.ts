import { api } from "@/api/axios/instance";

export interface GetReportsByPageParams {
  page: string;
}

export type GetReportsByPageConfig = AxiosRequestConfig<GetReportsByPageParams>;

export const getReportsByPage = async ({
  params,
  config
}: GetReportsByPageConfig) =>
  api.get<ApiReportsByPageResponse>(`/reports?page=${params.page}/`, config);
