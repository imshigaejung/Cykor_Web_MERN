const express = require("express");
const userRouter = express.Router();
const userProcess = require('../process/process_user');



//프로필 확인
userRouter.get('/profile/:userId', userProcess.profileUser);
//전체 사용자 검색
userRouter.get('/search', userProcess.searchUser);

//내 정보 수정
userRouter.patch('/edit', userProcess.editUser);

module.exports = userRouter;