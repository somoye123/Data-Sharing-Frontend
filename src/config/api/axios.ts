import axios from 'axios';

const Http = axios.create({
  baseURL: process.env.VITE_API_URL,
});

export const setToken = {
  getToken: async () => '',
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
    const token = await setToken.getToken();
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Http;
