import api from "../api/api";

export const makeMessage = (messageData) =>
    api.post('/api/message/make', messageData);

export const listMessage = (roomId) =>
    api.get(`/api/message/list/${roomId}`);

