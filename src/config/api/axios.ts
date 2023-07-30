import axios, { AxiosInstance } from 'axios';
import { User } from 'firebase/auth';

const Http: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL,
});
interface CurrentUser {
  currentUser: User | null;
}
export const setUser: CurrentUser = {
  currentUser: null,
};

Http.defaults.baseURL = process.env.VITE_API_URL;
Http.defaults.headers.common.Accept = 'application/json';
Http.defaults.headers['Access-Control-Allow-Origin'] = '*';
Http.defaults.headers['X-Frame-Options'] = 'SAMEORIGIN';
Http.defaults.headers['Content-Security-Policy'] = "frame-ancestors 'self'";
Http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

Http.interceptors.request.use(
  async (config) => {
    const token = await setUser.currentUser?.getIdToken();

    if (!config.headers.Authorization) {
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default Http;
