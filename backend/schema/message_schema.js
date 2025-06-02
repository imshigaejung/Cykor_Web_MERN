const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room_id: {type: mongoose.Schema.Types.ObjectId, required: true}, 
  user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  text: {type: String},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
  