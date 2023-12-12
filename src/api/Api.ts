// api.ts
import axios, { AxiosError } from 'axios';
import { GOOGLE_FONTS_API_KEY } from '../../Config';

const API_BASE_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';

export const getFonts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}?key=${GOOGLE_FONTS_API_KEY}`);
    return response.data.items;
  } catch (error:any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error fetching fonts:', axiosError.message, axiosError.response?.status);
    } else {
      console.error('Error fetching fonts:', error.message);
    }
    return [];
  }
};
