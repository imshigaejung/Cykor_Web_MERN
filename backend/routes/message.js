const express = require("express");
const messageRouter = express.Router();
const messageProcess = require('../process/process_message');

messageRouter.get('/list/:roomId', messageProcess.listMessage);

messageRouter.post('/make', messageProcess.makeMessage);

module.exports = messageRouter;