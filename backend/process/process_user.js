const userSchema = require('../schema/user_schema');
const { NotFoundError, BadRequestError } = require('../services/service_error');
const userService = require('../services/service_user');
const verify = require('../services/service_verify');

//get
exports.profileUser = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const userInfo = await userService.readUser("_id", userId);
        //불러오기 성공
        return res.status(200).json({message: "Profile loading complete", data: userInfo});
    } catch(error) {
        next(error);
    }
};

//get
exports.searchUser = async (req, res, next) => {
    try{
        const userName = req.query.userName;
        const userInfo = await userService.readUser("name", userName);
        //불러오기 성공
        return res.status(200).json({message: "Search complete", data: userInfo});
    } catch(error) {
        next(error);
    }
};

//patch
exports.editUser = async (req, res, next) => {
    try{
        const userId = req.session.userId;
        const userData = req.body;
        await userService.updateUser(userId, userData)
        //수정 성공
        return res.status(200).json({message: 'edit complete'});
    } catch(error) {
        next(error);
    }
};


