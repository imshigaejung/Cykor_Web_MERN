const User = require('../schema/user_schema');
const bcrypt = require('bcrypt');
const {ServerError, NotFoundError, BadRequestError} = require('../services/service_error');

exports.createUser = async (userData) => {
    try{
        const result = new User(userData);    
        return await result.save();
    } catch {
        throw new ServerError("Creation failure");
    }
};

exports.readUser = async (key, value) => {
    let result;
    if(key == "_id"){
        result = await User.findById(value);
    }else{
        result = await User.findOne({[key]: value}); 
    }
    if(!result){
        throw new NotFoundError("User not found");
    }
    return result; 
};


exports.updateUser = async (userId, userData, command) => {

    //불필요 한 값 주입 시 undefined로 초기화 방지
    let updatedData = {};   
    if (userData.name !== undefined) updatedData.name = userData.name;
    if (userData.stringId !== undefined) updatedData.stringId = userData.stringId;
    if (userData.is_Login !== undefined) updatedData.is_Login = userData.is_Login;
            
    //비밀번호 해싱
    if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        updatedData.password = await bcrypt.hash(userData.password, salt);
    }

    let result;

    //배열에 요소를 추가하는 경우
    if(command == "insert"){
        result = await User.findByIdAndUpdate(userId, {
            $set: updatedData,
            $addToSet: {
                myRooms: {$each: userData.myRooms || []},
                friends: {$each: userData.friends || []}
            }    
        }, 
        {new: true}
        );
        //배열에 요소를 삭제하는 경우
    } else if(command == "delete"){
        result = await User.findByIdAndUpdate(userId, {
            $set: updatedData,
            $pull: {
                myRooms: {$in: userData.myRooms || []},
                friends: {$in: userData.friends || []}
            }    
        }, 
        {new: true}
        );
        //배열을 수정하지 않는 경우
    } else if(command == "stay") {
        result = await User.findByIdAndUpdate(userId, {$set: updatedData}, {new: true});
    } else {
        const error = new NotFoundError("Command not found");
        throw error;
    }

    //수정 할 사용자 조회 실패 시
    if (!result) {
        throw new NotFoundError("User not found for update");
    }
    return result;
};

exports.deleteUser = async (userId) => {
    try{
        const result = await User.findByIdAndDelete(userId);
        if(!result){
            throw new NotFoundError("User not found for deletion");
        } 
        return result;
    } catch {
        throw new ServerError("Delete failure");
    }
    };