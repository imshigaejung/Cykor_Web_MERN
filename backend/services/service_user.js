const userSchema = require('../schema/user_schema');
const {ServerError, NotFoundError, BadRequestError} = require('../services/service_error');

exports.createUser = async (userData) => {
    const result = new User(userData);
    if(!result){
        throw new ServerError("Creation failure");
    } 
    return await result.save();
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
    if (userData.createdAt !== undefined) updatedData.createdAt = userData.createdAt;
            
    //비밀번호 해싱
    if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        updatedData.password = await bcrypt.hash(userData.password, salt);
    }

    //안정성을 위해 우선 초기화
    let result = {};

    //배열에 요소를 추가할지 삭제할지 결정
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
    } else {
        const error = new NotFoundError("Command not found");
        throw error;
    }
    return result;
};

exports.deleteUser = async (userId) => {
    const result = await User.findByIdAndDelete(userId);
        if(!result){
            throw new ServerError("Delete failure");
        } 
        return result;
    };