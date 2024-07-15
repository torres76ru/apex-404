import { InitDataParsed } from "@tma.js/sdk-react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitDataState {
  initData: InitDataParsed | null;
  token: string | null;
  status: string | null;
}
// Начальное состояние
const initialState: InitDataState = {
  initData: null,
  token: null,
  status: "guest"
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
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    }
  }
});

// Экспорт действий
export const { setInitData, setToken, setStatus } = toolkitSlice.actions;

// Экспорт редьюсера
export default toolkitSlice.reducer;
