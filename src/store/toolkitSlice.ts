import { InitDataParsed } from "@tma.js/sdk-react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitDataState {
  initData: InitDataParsed | null;
  token: string | null;
}
// Начальное состояние
const initialState: InitDataState = {
  initData: null,
  token: null
};

// Создание слайса
const toolkitSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInitData(state, action: PayloadAction<InitDataParsed>) {
      state.initData = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    }
  }
});

// Экспорт действий
export const { setInitData, setToken } = toolkitSlice.actions;

// Экспорт редьюсера
export default toolkitSlice.reducer;
