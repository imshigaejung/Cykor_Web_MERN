const bcrypt = require('bcrypt');

exports.verifyUsername = async(username) =>{
    let result = await User.findOne({name: username});
    if(result){
        return true;
    }
    else{
        return false;
    }
}

exports.verifyPassword = async(inputPassword, userPassword) =>{
    return await bcrypt.compare(inputPassword, userPassword);
}   