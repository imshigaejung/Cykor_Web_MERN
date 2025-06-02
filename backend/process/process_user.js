const userSchema = require('../schema/user_schema');
const userService = require('../services/service_user');
const verify = require('../services/service_verify');

exports.signupUser = async (req, res, next) => {
    try{
        const userData = req.body;
        const user = await verify.verifyUsername(userData.name)
        if(user){
            return res.status(400).json({err: 'Existing name'});
        } else {
        return res.status(201).json(await userService.createUser(userData));
        }
    } catch {
        return res.status(400).json({err: 'Invalid action'});
    }
};

exports.loginUser = async (req, res, next) => {
    try{
        const userData = req.body;
        const user = await verify.verifyUsername(userData.name);
        console.log(user);
        if(!user){
            return res.status(400).json({err: 'User not found'});
        } else {
            if(await verify.verifyPassword(userData.password, user.password)){

                //updateUser  관련 수정 필요
                return res.status(201).json(await userService.updateUser(userData));
            }
            else return res.status(400).json({err: 'Wrong password'});
        }
    }catch{
        return res.status(400).json({err: 'Invalid action'});
    }
};

exports.profileUser = async (req, res, next) => {
    res.send('profile compliance');
    try{
        const userId = req.params.id;
        return await res.status(200).json(userService.readUsers("_id", userId));
    } catch {
        return res.status(400).json({err: 'Invalid action'});
    }
};

exports.searchUser = async (req, res, next) => {
    res.send('search compliance');
    try{
        const userName = req.query.search;
        return await res.status(200).json(userService.readUsers("name", userName));
    } catch {
        return res.status(400).json({err: 'Invalid action'});
    }
};

exports.editUser = async (req, res, next) => {
    res.send('edit compliance');
    try{
        const userId = req.params.Id;
        const userData = req.body;
        return await res.status(200).json(userService.updateUser(userId, userData));
    } catch {
        return res.status(400).json({err: 'Invalid action'});
    }
};


