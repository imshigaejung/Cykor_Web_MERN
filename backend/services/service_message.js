const Message = require('../schema/message_schema');
const { NotFoundError, ServerError } = require('./service_error');

exports.createMessage = async (messageData) => {
    try{
        const result = new Message(messageData);    
        return await result.save();
    } catch {
        throw new ServerError("Creation failure");
    }
};


exports.readMessage = async (key, value) => {
    let result;
    if(key == "_id"){
        result = await Message.findById(value);
    }else{
        result = await Message.find({[key]: value}); 
    }
    if(!result){
        throw new NotFoundError("Message not found");
    }
    return result; 
};