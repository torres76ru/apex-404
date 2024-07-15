import { api } from "@/api/axios/instance";

interface ActionUserParams {
  userId: number;
}

export type ActionUserConfig = AxiosRequestConfig<ActionUserParams>;

export const postBanUser = async ({ params, config }: ActionUserConfig) =>
  api.post(`/user/${params.userId}/ban`, {}, config);

export const postUnbanUser = async ({ params, config }: ActionUserConfig) =>
  api.post(`/user/${params.userId}/unban`, {}, config);

export const postFreezeUser = async ({ params, config }: ActionUserConfig) =>
  api.post(`/user/${params.userId}/freeze`, {}, config);

export const postUnfreezeUser = async ({ params, config }: ActionUserConfig) =>
  api.post(`/user/${params.userId}/unfreeze`, {}, config);
