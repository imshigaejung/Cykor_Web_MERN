const express = require("express");
const roomRouter = express.Router();
const roomProcess = require('../process/process_room');

roomRouter.post('/make', roomProcess.makeRoom);

roomRouter.get('/profile/:roomId', roomProcess.profileRoom);
roomRouter.get('/list', roomProcess.listRoom);

roomRouter.patch('/invite/:roomId', roomProcess.inviteToRoom);

roomRouter.delete('/leave/:roomId', roomProcess.leaveRoom);
roomRouter.delete('/delete/:roomId', roomProcess.destroyRoom);


module.exports = roomRouter;