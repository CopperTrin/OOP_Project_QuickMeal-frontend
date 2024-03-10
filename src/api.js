import axios, { AxiosHeaders } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://127.0.0.1:8000';

function getHeaders() {
    if (typeof window !== "undefined") {
        const token = Cookies.get("token");
        if (token) {
            const headers = new AxiosHeaders({
                Authorization: `Bearer ${token}`,
            });
            return headers;
        }
    }
    return new AxiosHeaders();
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: getHeaders(),
});

export default api;