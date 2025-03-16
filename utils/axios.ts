import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '@/config-global';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

export type FetcherArgs = string | [string, AxiosRequestConfig];

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const cacheKey = `cache_${url}`; // Unique cache key for each request

  try {
    const res = await axiosInstance.get(url, { ...config });

    // Store API response in AsyncStorage
    await AsyncStorage.setItem(cacheKey, JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    console.error('Network request failed:', error);

    // Try to return cached data if available
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      console.warn('Returning cached data due to network failure.');
      return JSON.parse(cachedData);
    }

    throw error;
  }
};


export const endpoints = {
  password: {
    forget: 'api/v1/admin/password/forgot',
    submit: 'api/v1/admin/password/submit',
    reset: 'api/v1/admin/password/reset',
  },
  auth: {
    me: 'api/v1/admin/auth/profile',
    signIn: 'api/v1/admin/auth/login',
    changePassword: 'api/v1/admin/password/change',
    updateAuthUser: 'api/v1/admin/auth/profile',
  },
  highlights: {
    get: 'api/gg'
  },
}
