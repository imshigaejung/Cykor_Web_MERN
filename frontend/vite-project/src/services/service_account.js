import api from "../api/api";

export const accountLogin = (userData) =>
    api.post(`/api/account/login`, userData);

export const accountSignup = (userData) =>
    api.post(`/api/account/signup`, userData);

export const accountLogout = () =>
    api.delete(`/api/account/logout`);

export const accountCurrentUser = () => 
    api.get('/api/session/me');