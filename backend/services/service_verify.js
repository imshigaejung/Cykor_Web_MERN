const bcrypt = require('bcrypt');
const User = require('../schema/user_schema');
const Room = require('../schema/room_schema');
const { NotFoundError, UnauthorizedError } = require('./service_error');


exports.verifyUserstringId = async(userstringId) =>{
    let result = await User.findOne({id: userstringId});
    if(result){
        return result;
    }
    else{
        return undefined;
    }
}

exports.verifyPassword = async(inputPassword, userPassword) =>{
    return await bcrypt.compare(inputPassword, userPassword);
}   

exports.verifyHost = async(roomId, userId) =>{
    const currentRoom = await Room.findById(roomId);
    if(!currentRoom){
        throw new NotFoundError("Room not found");
    }
    if(currentRoom.host == userId){
        return true;
    }
    else{
        return false;
    }
}

exports.verifyIsLogin = async(req, res, next) => {
    if(!req.session.userId){
        return next(new UnauthorizedError("Login Required"));
    }
    next();
}

exports.verifyIsEmpty = async(value) => {
    if(!value){
        throw new NotFoundError("There Is No Input");
    }
}