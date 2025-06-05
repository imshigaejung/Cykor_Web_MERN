const userSchema = require('../schema/user_schema');
const { NotFoundError, BadRequestError } = require('../services/service_error');
const userService = require('../services/service_user');
const verify = require('../services/service_verify');

//post
exports.accountSignup = async (req, res, next) => {
    try{
        console.log("acountafaefeafawef12345678965");
        //사용자 정보 - 문자 Id, 비밀번호
        const userData = req.body;
        //빈 값인지 확인하는 구문
        await Promise.all([
            verify.verifyIsEmpty(userData.stringId),
            verify.verifyIsEmpty(userData.password)
        ]);
        //조회 되면 조회 된 유저의 객체, 실패 시 undefined 반환
        const user = await verify.verifyUserstringId(userData.stringId)
        if(user){
            throw new BadRequestError('Existing name');
        } else {
        await userService.createUser(userData);
        //생성 성공
        return res.status(201).json({message: "Creation complete"});
        }
    } catch(error) {
        next(error);
    }
};

//post
exports.accountLogin = async (req, res, next) => {
    console.log("acountafaefeafawef12345678965");
    try{
        //사용자 정보 - 문자 Id, 비밀번호
        const userData = req.body;
        //빈 값인지 확인하는 구문
        await Promise.all([
            verify.verifyIsEmpty(userData.stringId),
            verify.verifyIsEmpty(userData.password)
        ]);
        //조회 되면 조회 된 유저의 객체, 실패 시 undefined 반환
        const user = await verify.verifyUserstringId(userData.stringId);
        if(!user){
            throw new NotFoundError('User not found');
        } else {
            if(await verify.verifyPassword(userData.password, user.password)){
                req.session.userId = user._id;
                const userId = req.session.userId;
                await userService.updateUser(userId, userData, "stay");
                //수정 성공
                return res.status(200).json({message: "Login complete"});
            }
            throw new BadRequestError('Wrong password');
        }
    }catch(error){
        next(error);
    }
};

//delete
exports.accountLogout = async (req, res, next) => {
    try{
        //세션에 저장해뒀던 사용자 정보 해제
        req.session.userId = undefined;
        //수정 성공
        return res.status(200).json({message: "Logout complete"});
    }catch(error){
        next(error);
    }
};
