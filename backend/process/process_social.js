const userService = require('../services/service_user');

//post
exports.addFriends = async (req, res, next) => {
    try{
        const friendId = req.param.id;
        await userService.updateUser(req.session.userId, {friends: friendId}, "insert");
        return res.status(200).json({message: "Adding friend complete"});
    } catch(error) {
        next(error);
    }
}

//delete
exports.deleteFriends = async(req, res, next) => {
    try{
        const friendId = req.param.id;
        await userService.updateUser(req.session.userId, {friends: friendId}, "delete");
        return res.status(200).json({message: "Deleting friend complete"});
    } catch(error) {
        next(error);
    }
}

//get
exports.listFriends = async(req, res, next) => {
    try{
        const currentUser = await userService.readUser("_id",req.session.userId);
        const friendsId = currentUser.friends;
        const friendsInfo = await Promise.all(
            friendsId.map(async friendId => {
                const friend = await userService.readUser("_id", friendId)
                return {name: friend.name, userId: friendId};
            }),
        );
        return res.status(200).json({message: "Listing friend complete", data: friendsInfo});
    } catch(error) {
        next(error);
    }
}

