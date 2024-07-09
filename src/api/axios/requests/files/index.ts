import { api } from "@/api/axios/instance";

export interface PostFileParams {
  reportId: string;
  formData: FormData;
}

export type PostFileConfig = AxiosRequestConfig<PostFileParams>;

export const postFile = async ({ params, config }: PostFileConfig) =>
  api.post<ApiPostFileResponse>(
    `/file/${params.reportId}/image/`,
    params.formData,
    config
  );
