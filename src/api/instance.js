import axios from "axios";
const api = axios.create();

api.interceptors.request.use((request) => {
  // add auth header with jwt if local storage exist token
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});
export default api;
