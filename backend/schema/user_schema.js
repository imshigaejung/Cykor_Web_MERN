const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
    
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    stringId: {type: String, required: true},
    password: {type: String, required: true}, 
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    myRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: [] }],
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // 해싱 적용    
    next();
})
    
module.exports = mongoose.model('User', userSchema);