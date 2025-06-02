const express = require("express");
const userRouter = express.Router();
const userProcess = require('../process/process_user');

//회원가입
userRouter.post('/signup', userProcess.signupUser);
//로그인
userRouter.post('/login', userProcess.loginUser);

//프로필 확인
userRouter.get('/profile', userProcess.profileUser);
//전체 사용자 검색
userRouter.get('/search', userProcess.searchUser);

//내 정보 수정
userRouter.patch('/profile', userProcess.editUser);

module.exports = userRouter;