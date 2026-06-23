import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-backend-96ho.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;