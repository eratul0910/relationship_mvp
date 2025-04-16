const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  userId: String,
  userText: String,
  aiText: String,
  phase: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', MessageSchema);
