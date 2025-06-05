const express = require('express');
const router = express.Router();

const accountRouter = require('./account');
const userRouter = require('./user');
const socialRouter = require('./social');
const roomRouter = require('./room');
const messageRouter = require('./message');
const verify = require('../services/service_verify');


console.log("route entered!");
router.use('/account',accountRouter);

router.use(verify.verifyIsLogin);
router.get('/session/me', (req,res) => {
    res.json({userId: req.session.userId});
})

router.use('/user',userRouter);
router.use('/room',roomRouter);
router.use('/social',socialRouter);
router.use('/message',messageRouter);

module.exports = router;