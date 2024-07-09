import { RootState } from ".";

export const selectToken = (state: RootState) => state.toolkit.token;
export const selectInitData = (state: RootState) => state.toolkit.initData;
