const express = require("express");
const socialRouter = express.Router();
const socialProcess = require('../process/process_social');

socialRouter.get('/list', socialProcess.listFriends);

socialRouter.post('/add/:userId', socialProcess.addFriends);

socialRouter.delete('/delete/:userId', socialProcess.deleteFriends);

module.exports = socialRouter;