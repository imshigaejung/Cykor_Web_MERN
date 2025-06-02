const Room = require('../schema/room_schema');

exports.createRoom = async (roomData) => {
    const newRoom = new Room(roomData);
    return await newRoom.save();
};

exports.readRoom = async (key, value) => {
    if(key == "_id"){
        return await Room.findById(value);
    }else{
        return await Room.findOne({[key]: value}); 
    }
};

exports.updateRoom = async (roomId, roomData) => {
    return await Room.findByIdAndUpdate(roomId, roomData, {new: true});
};