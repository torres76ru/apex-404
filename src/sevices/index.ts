import axios from "axios";
import { ApiResponse, ApiResponseToken } from "../types";
import { InitDataParsed } from "@tma.js/sdk-react";

const API_URL = import.meta.env.VITE_URL; // замените на ваш API endpoint

export const fetchReports = async (day: string): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`${API_URL}/reports/${day}`);
  return response.data;
};

export const getDay = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`${API_URL}/days/current`);
  return response.data;
};

export const fetchToken = async (
  initData: InitDataParsed
): Promise<ApiResponseToken> => {
  try {
    const response = await axios.post<ApiResponseToken>(
      `${API_URL}/auth`,
      initData
    );

    // Проверяем успешность ответа
    if (response.data.status !== "Success") {
      throw new Error(response.data.message || "Error fetching token. here");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else {
      console.error("General error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

//     alert("here");
// const { token } = response.data;

// // Сохраняем токен в куки на 7 дней
// Cookies.set("token", token, { expires: 7 });
