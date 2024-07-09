import { api } from "@/api/axios/instance";

export interface PostMailParams {
  email: string;
  userChatId: string;
}

export type PostMailConfig = AxiosRequestConfig<PostMailParams>;

export const postMail = async ({ params, config }: PostMailConfig) =>
  api.post(`/transaction`, params, config);
