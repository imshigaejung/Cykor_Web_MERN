const express = require("express");
const accountRouter = express.Router();
const accountProcess = require('../process/process_account');

//회원가입
accountRouter.post('/signup', accountProcess.accountSignup);
//로그인
accountRouter.post('/login', (req, res, next) => {
  console.log(">> POST /account/login 진입");
  next();
}, accountProcess.accountLogin);
//로그아웃
accountRouter.delete('/logout', accountProcess.accountLogout);

module.exports = accountRouter;