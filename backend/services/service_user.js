const userSchema = require('../schema/user_schema');

exports.createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

exports.readUser = async (key, value) => {
    if(key == "_id"){
        return await User.findById(value);
    }else{
        return await User.findOne({[key]: value}); 
    }
};


exports.updateUser = async (userId, userData) => {

    let updatedData = {
            name: userData.name,
            is_Login: userData.is_Login, 
            createdAt: userData.createdAt
        }
    
    if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        updatedFields.password = await bcrypt.hash(userData.password, salt);
    }
    
    return await User.findByIdAndUpdate(userId, {
        $set: updatedData,
        $addToSet: {
            myRooms: {$each: userData.myRooms},
            friends: {$each: userData.friends}
        }    
    }, 
    {new: true}
    );
};

exports.deleteUser = async (userId) => {
    const newUser = new Room(userId);
    return await newUser.save()
};