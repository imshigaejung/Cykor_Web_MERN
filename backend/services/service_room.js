const Room = require('../schema/room_schema');
const {ServerError, NotFoundError, BadRequestError} = require('../services/service_error');

exports.createRoom = async (roomData) => {
    const result = new Room(roomData);
    if(!result){
        throw ServerError("Creation failure");
    } 
    return await result.save();
};

exports.readRoom = async (key, value) => {
    let result;

    if(key == "_id"){
        result = await Room.findById(value);
    }else{
        result = await Room.findOne({[key]: value}); 
    }
    //조회 실패시 error throw
    if(!result){
        throw NotFoundError("Room not found");
    }
    return result;
};

exports.updateRoom = async (roomId, roomData) => {

    //불필요 한 값 주입 시 undefined로 초기화 방지
    let updatedData = {};
    if (roomData.name !== undefined) updatedData.name = roomData.name;
    if (roomData.host !== undefined) updatedData.host = roomData.host;
    if (roomData.createdAt !== undefined) updatedData.createdAt = roomData.createdAt;

    //안정성을 위해 우선 초기화
    let result = {};

    if(command == "insert"){
        result = await Room.findByIdAndUpdate(roomId, {
            $set: updatedData,
            $addToSet: {
                members: {$each: roomData.members || []}
            }    
        }, 
        {new: true}
        );
    
    } else if(command == "delete") {
        result = await Room.findByIdAndUpdate(roomId, {
            $set: updatedData,
            $pull: {
                members: {$in: roomData.members || []}
            }    
        }, 
        {new: true}
        );
    } else {
        throw NotFoundError("Command not found");
    }
    return result;
};

exports.deleteRoom = async (roomId) => {
    const result = await Room.findByIdAndDelete(roomId);
    if(!result){
        throw new ServerError("Delete failure");
    } 
    return result;
};
