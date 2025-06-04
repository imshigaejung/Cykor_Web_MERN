const Room = require('../schema/room_schema');
const {ServerError, NotFoundError, BadRequestError} = require('../services/service_error');

exports.createRoom = async (roomData) => {
    try{
            const result = new Room(roomData);    
            return await result.save();
        } catch {
            throw new ServerError("Creation failure");
        }
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
        throw new NotFoundError("Room not found");
    }
    return result;
};

exports.updateRoom = async (roomId, roomData, command) => {

    //불필요 한 값 주입 시 undefined로 초기화 방지
    let updatedData = {};
    if (roomData.name !== undefined) updatedData.name = roomData.name;
    if (roomData.host !== undefined) updatedData.host = roomData.host;

    let result;
        //배열에 요소를 추가하는 경우
    if(command == "insert"){
        result = await Room.findByIdAndUpdate(roomId, {
            $set: updatedData,
            $addToSet: {
                members: {$each: roomData.members || []}
            }    
        }, 
        {new: true}
        );
    
        //배열에 요소를 삭제하는 경우
    } else if(command == "delete") {
        result = await Room.findByIdAndUpdate(roomId, {
            $set: updatedData,
            $pull: {
                members: {$in: roomData.members || []}
            }    
        }, 
        {new: true}
        );
        //배열을 수정하지 않는 경우
    } else if(command == "stay") {
            result = await Room.findByIdAndUpdate(roomId, {$set: updatedData}, {new: true});
    } else {
        throw new NotFoundError("Command not found");
    }

    //수정 할 방 조회 실패 시
    if (!result) {
        throw new NotFoundError("Room not found for update");
    }

    return result;
};

exports.deleteRoom = async (roomId) => {
    try{
        const result = await Room.findByIdAndDelete(roomId);
        if(!result){
            throw new NotFoundError("Room not found for deletion");
        } 
        return result;
    } catch {
        throw new ServerError("Delete failure");
    }
};
