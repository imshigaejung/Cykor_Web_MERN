const Room = require('../schema/room_schema');
const userService = require('../services/service_user')
const roomService = require('../services/service_room');

exports.makeRoom = async (req, res, next) => {
    try{
        const roomData = req.body;
        return res.status(201).json(await roomService.createRoom(roomData));
    } catch {
        return res.status(400).json({err: 'Invalid action'});
    }
    
};

exports.profileRoom = async (req, res, next) => {
    try{
        const userId = req.params.id;
        return await res.status(200).json(userService.readUsers("_id", userId));
    } catch {
        return res.status(400).json({err: 'Invalid action'});
    }
};

exports.inviteToRoom = async (req, res, next) => {
    try{
        const roomId = req.params.id;
        //members는 배열로 전달해야 함
        const userIds = req.body.members;
        if(!Array.isArray(userIds)){
            return res.status(400).json({err: 'Members must be array'});
        }
        const updatedUser = userIds.map(userId =>
            userService.updateUser(userId,)
        )
        return await Promise.all([
            res.status(200).json(roomService.editUsers(roomId,userIds)),
            res.status(200).json(userService)
        ])


    } catch {
        return res.status(400).json({err: 'Invalid action'});
    }
};

exports.destroyRoom = async (req, res, next) => {
    try{
        
    } catch {
        return res.status(400).json({err: 'Invalid action'});
    }
};
