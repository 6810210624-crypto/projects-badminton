import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // หรือ Port ที่ Backend รันอยู่
});

// Interceptor: ดึง Token จาก localStorage มาแปะใส่ Header ทุกครั้งที่มีการส่ง Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;