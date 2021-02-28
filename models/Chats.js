const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creator_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Chats", chatsSchema);
