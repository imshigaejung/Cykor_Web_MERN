const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const socialRouter = require('./social');
const roomRouter = require('./room');

router.use('/user',userRouter);
router.use('/room',roomRouter);
router.use('/social',socialRouter);

module.exports = router;