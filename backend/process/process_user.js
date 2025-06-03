const userSchema = require('../schema/user_schema');
const { NotFoundError, BadRequestError } = require('../services/service_error');
const userService = require('../services/service_user');
const verify = require('../services/service_verify');

exports.signupUser = async (req, res, next) => {
    try{
        const userData = req.body;
        const user = await verify.verifyUserstringId(userData.stringId)
        if(user){
            throw new BadRequestError('Existing name');
        } else {
        await userService.createUser(userData)
        //생성 성공
        return res.status(201).json({message: "Creation complete"});
        }
    } catch {
        return res.status(error.statusCode).json({error: error.message});
    }
};

exports.loginUser = async (req, res, next) => {
    try{
        const userData = req.body;
        const user = await verify.verifyUserstringId(userData.stringId);
        if(!user){
            throw new NotFoundError('User not found');
        } else {
            if(await verify.verifyPassword(userData.password, user.password)){
                await userService.updateUser(userData);
                req.session.userId = req.body._id;
                //수정 성공
                return res.status(200).json({message: "Login complete"});
            }
            throw new BadRequestError('Wrong password');
        }
    }catch(error){
        return res.status(error.statusCode).json({error: error.message});
    }
};

exports.profileUser = async (req, res, next) => {
    try{
        const userId = req.params.id;
        await userService.readUsers("_id", userId)
        //불러오기 성공
        return res.status(200).json({message: "Profile loading complete"});
    } catch {
        return res.status(error.statusCode).json({error: error.message});
    }
};

exports.searchUser = async (req, res, next) => {
    res.send('search compliance');
    try{
        const userName = req.query.search;
        await userService.readUsers("name", userName);
        //불러오기 성공
        return res.status(200).json({message: "Search complete"});
    } catch {
        return res.status(error.statusCode).json({error: error.message});
    }
};

exports.editUser = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const userData = req.body;
        await userService.updateUser(userId, userData)
        //수정 성공
        return res.status(200).json({message: 'edit complete'});
    } catch(error) {
        return res.status(error.statusCode).json({err: error.message});
    }
};


