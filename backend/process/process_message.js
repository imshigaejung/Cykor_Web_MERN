const messageService = require('../services/service_message');
const roomService = require('../services/service_room');
const userService = require('../services/service_user');
//post
exports.makeMessage = async (req, res, next) => {
    try{
        const messageData = req.body;
        await messageService.createRoom(messageData)
        //생성 성공
        return res.status(201).json({message: "Creation complete"});
    } catch(error) {
        next(error);
    }
    
};

//get
exports.listMessage = async(req, res, next) => {
    try{
        const roomId = req.params.id;
        const messageArray = await roomService.readMessage("room_id", roomId);
        const messageData = await Promise.all(
            messageArray.map(async userId => {
                const userData = await userService.readUser("_id", userId);
                return {userName: userData.name, text: messageArray.text};
            })
        )
        return res.status(200).json({message: "Listing messages complete", data: messageData});
    } catch(error) {
        next(error);
    }
}
