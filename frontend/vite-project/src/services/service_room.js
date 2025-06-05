import api from "../api/api";

export const makeRoom = (roomData) =>
    api.post('/api/room/make', roomData);

export const profileRoom = (roomId) =>
    api.get(`/api/room/profile/${roomId}`);

export const inviteToRoom = (roomId, usersId) =>
    api.patch(`/api/room/invite/${roomId}`, usersId);

export const destroyRoom = (roomId) =>
    api.delete(`/api/room/delete/${roomId}`);

export const listRoom = () =>
    api.get('/api/room/list');

export const leaveRoom = (roomId) =>
    api.delete(`/api/room/leave/${roomId}`);


