import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: false,
});

// opcional: token persistente
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AuthAPI = {
  async login(email: string, pin: string) {
    const res = await API.post("/auth/login", { email, pin });
    return res.data;
  },

  async register(name: string, email: string, pin: string) {
    const res = await API.post("/auth/register", { name, email, pin });
    return res.data;
  },

  async getUser() {
    const res = await API.get("/auth/getdata");
    return res.data.user;
  },

  async deleteAccount() {
    const res = await API.delete("/auth/delete");
    return res.data;
  },
};
