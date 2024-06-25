import { api } from "@/api/axios/instance";

interface Question {
  id: number;
  body: string;
  answer: string | File;
}

export type PostReportParams = { questions: Question[] };

export type PostReportConfig = AxiosRequestConfig<FormData>;

export const postUserReport = async ({ params, config }: PostReportConfig) =>
  api.post(`/user/report`, params, config);
