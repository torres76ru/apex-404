import { api } from "@/api/axios/instance";

interface Questions {
  question1: string;
  question2: string;
  question3: string;
}

export type PostReportParams = Questions;

export type PostReportConfig = AxiosRequestConfig<PostReportParams>;

export const postUserReport = async ({ params, config }: PostReportConfig) =>
  api.post(`/user/report`, params, config);
