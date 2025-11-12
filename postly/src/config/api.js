import axios from "axios"

export const API_BASED_URL="http://localhost:8085/api"



export const api = axios.create({
  baseURL: API_BASED_URL,
//   headers: { "Content-Type": "application/json" }
});

// ✅ Interceptor to always use latest token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});





//============================================

// export const api=axios.create({
//     baseURL:API_BASED_URL,
//     headers:{
//         "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
//         // "Content-Type":"application/json"
//     }
// })