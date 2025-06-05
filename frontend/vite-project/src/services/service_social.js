import api from "../api/api";

export const deleteFriends = (userId) =>
    api.post(`/api/social/delete/${userId}`);

export const addFriends = (userId) =>
    api.get(`/api/social/add/${userId}`);

export const listFriends = () =>
    api.get('/api/social/list');


