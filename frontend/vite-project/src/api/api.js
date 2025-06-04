import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
  //세션 유지 용
  withCredentials: true,
});

export default api;