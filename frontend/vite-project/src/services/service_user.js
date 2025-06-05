import api from "../api/api";

export const profileUser = (userId) =>
    api.get(`/api/user/profile/${userId}`);

export const searchUser = (userName) =>
    api.get('/api/user/search',{
        params: {userName: userName}
    });

export const editUser = (userData) =>
    api.patch(`/api/user/edit`, userData);
