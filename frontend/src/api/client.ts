import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get("refresh_token");
                if (refreshToken) {
                    const response = await api.post("/auth/refresh", { refresh_token: refreshToken });
                    const newAccessToken = response.data.access_token;
                    useAuthStore.getState().setToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (error) {
                useAuthStore.getState().logout();
            }
        }
        return Promise.reject(error);
    }
)

export default api;