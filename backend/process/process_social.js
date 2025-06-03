const userSchema = require('../schema/user_schema');
const userService = require('../services/service_user');

exports.addFriends = async (req, res, next) => {
    try{
        const friendId = req.param.id;
        await userService.updateUser(req.session.userId, {friends: friendId}, "insert");
        return res.status(200).json({message: "Adding friend complete"});
    } catch(error) {
        return res.status(error.statusCode).json({error: error.message});
    }
}

exports.deleteFriends = async(req, res, next) => {
    try{
        const friendId = req.param.id;
        await userService.updateUser(req.session.userId, {friends: friendId}, "delete");
        return res.status(200).json({message: "Deleting friend complete"});
    } catch(error) {
        return res.status(error.statusCode).json({error: error.message});
    }
}

exports.listFriends = async(req, res, next) => {
    try{
        const currentUser = await userService.readUser("_id",req.session.userId);
        const friendsId = currentUser.friends;
        const friendNames = await Promise.all(
            friendsId.map(async friendId => {
                const friend = await userService.readUser("_id", friendId)
                return friend.name;
            }),
        );
        return res.status(200).json({message: "Listing friend complete"});
    } catch(error) {
        return res.status(error.statusCode).json({error: error.message});
    }
}

