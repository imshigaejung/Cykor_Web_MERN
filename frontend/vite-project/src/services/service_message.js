import api from "../api/api";

export const makeMessage = (messageData) =>
    api.post('/message/make', messageData);

export const listMessage = (roomId) =>
    api.get(`/message/list/${roomId}`);

