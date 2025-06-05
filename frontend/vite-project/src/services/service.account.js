import api from "../api/api";

export const accountLogin = (userData) =>
    api.post(`/account/login`, userData);

export const accountSignup = (userData) =>
    api.post(`/account/signup`, userData);

export const accountLogout = () =>
    api.delete(`/account/logout`);

export const accountCurrentUser = () => 
    api.get('/session/me');