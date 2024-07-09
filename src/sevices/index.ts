import axios from "axios";
import { ApiResponseToken } from "../types";

const API_URL = import.meta.env.VITE_URL; // замените на ваш API endpoint

export const fetchToken = async (
  initData: string
): Promise<ApiResponseToken> => {
  try {
    const response = await axios.post<ApiResponseToken>(
      `${API_URL}/auth`, // /auth
      {},
      {
        headers: { Authorization: initData }
      }
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
