const userService = require('../services/service_user');
const roomService = require('../services/service_room');
const verify = require('../services/service_verify');
const { BadRequestError } = require('../services/service_error');

//post
exports.makeRoom = async (req, res, next) => {
    try{
        const roomData = req.body;
        await roomService.createRoom(roomData)
        //생성성 성공
        return res.status(201).json({message: "Creation complete"});
    } catch(error) {
        next(error);
    }
    
};

//get
exports.profileRoom = async (req, res, next) => {
    try{
        const roomId = req.params.id;
        const roomInfo = await roomService.readRoom("_id", roomId);
        //불러오기 성공
        return res.status(200).json({message: "Reading Complete", data: roomInfo});
    } catch(error) {
        next(error);
    }
};

//patch
exports.inviteToRoom = async (req, res, next) => {
    try{
        const roomId = req.params.id;
        const userIds = req.body.members;
        //members는 배열로 전달해야 함
        if(!Array.isArray(userIds)){
            throw new BadRequestError("Members must be Array");
        }
        //초대 된 모든 사용자에게 초대 된 채팅방 id 저장 
        await Promise.all(
            userIds.map(userId => userService.updateUser(userId, {myRooms: [roomId]}, "insert")),
        );
        //방 정보에 초대 된 사용자 정보 저장
        await roomService.updateRoom(roomId, {members: userIds}, "insert");   

        //수정 성공
        return res.status(200).json({message: 'Update complete'});
    } catch(error) {
        next(error);
    }
};

//delete
exports.destroyRoom = async (req, res, next) => {
    try{
        const roomId = req.params.id;
        const currentRoom = await roomService.readRoom("_id", roomId);
        if(verify.verifyHost(roomId, req.session.userId)){
            await Promise.all(
            currentRoom.members.map(userId => userService.updateUser(userId, {myRooms: [roomId]},"delete"))
            );
            await roomService.deleteRoom(roomId);
            //삭제 성공
            return res.status(200).json({message: 'Delete complete'});
        }
        else{
            throw new BadRequestError('Only host can delete the room');
        }
        
    } catch(error) {
       next(error);
    }
};

//get
exports.listRoom = async(req, res, next) => {
    try{
        const currentUser = await userService.readUser("_id",req.session.userId);
        const myRoomsId = currentUser.myRooms;
        const myRoomNames = await Promise.all(
            myRoomsId.map(async myRoomId => {
                const myRoom = await roomService.readRoom("_id", myRoomId);
                return myRoom.name;
            }),
        );
        return res.status(200).json({message: "Listing my rooms complete", data: myRoomNames});
    } catch(error) {
       next(error);
    }
}

//delete
exports.leaveRoom= async(req, res, next) => {
    try{
        const roomId = req.params.id;
        const userId = req.session.userId;

        //사용자의 방 목록에서 해당 방 삭제
        await userService.updateUser(userId, {myRooms: [roomId]}, "delete");
        
        //방의 사용자 목록에서 해당 사용자 삭제
        await roomService.updateRoom(roomId, {members: userId}, "delete");   

        //수정 성공
        return res.status(200).json({message: 'Update complete'});
    } catch(error) {
        next(error);
    }
}