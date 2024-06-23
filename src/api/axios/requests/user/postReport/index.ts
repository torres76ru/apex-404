import { api } from "@/api/axios/instance";

interface Question {
  id: number;
  body: string;
  answer: string;
}

export type PostReportParams = { questions: Question[] };

export type PostReportConfig = AxiosRequestConfig<PostReportParams>;

export const postUserReport = async ({ params, config }: PostReportConfig) =>
  api.post(`/user/report`, params, config);
