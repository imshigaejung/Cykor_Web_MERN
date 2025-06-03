const bcrypt = require('bcrypt');
const { findById } = require('../schema/room_schema');
const { NotFoundError } = require('./service_error');


exports.verifyUserstringId = async(userstringId) =>{
    let result = await User.findOne({id: userstringId});
    if(result){
        return true;
    }
    else{
        return false;
    }
}

exports.verifyPassword = async(inputPassword, userPassword) =>{
    return await bcrypt.compare(inputPassword, userPassword);
}   

exports.verifyHost = async(roomId, userId) =>{
    const currentRoom = await Room.findById(roomId);
    if(!currentRoom){
        throw NotFoundError("Room not found");
    }
    if(currentRoom.host == userId){
        return true;
    }
    else{
        return false;
    }
}