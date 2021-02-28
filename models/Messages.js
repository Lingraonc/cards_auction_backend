const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  chat_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Messages", messagesSchema);
