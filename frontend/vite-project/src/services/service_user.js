import api from "../api/api";

export const profileUser = (userId) =>
    api.get(`/user/profile/${userId}`);

export const searchUser = (userName) =>
    api.get('/user/search',{
        params: {userName: userName}
    });

export const editUser = (userData) =>
    api.patch(`/user/edit`, userData);
