import axios from "axios";
import Cookies from "js-cookie";

function getHeaders() {
  if (typeof window !== "undefined") {
    const token = Cookies.get("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: getHeaders(),
});

export default api;