import api from "../api/api";

export const makeRoom = (roomData) =>
    api.post('/room/make', roomData);

export const profileRoom = (roomId) =>
    api.get(`/room/profile/${roomId}`);

export const inviteToRoom = (roomId, usersId) =>
    api.patch(`/room/invite/${roomId}`, usersId);

export const destroyRoom = (roomId) =>
    api.delete(`/room/delete/${roomId}`);

export const listRoom = () =>
    api.get('/room/list');

