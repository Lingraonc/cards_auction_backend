const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: {
    type: [{ type: Schema.Types.ObjectId }],
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  sets: [{ type: Schema.Types.ObjectId }],
  cards: [{ type: Schema.Types.ObjectId }],
  blocked_cards: [{ type: Schema.Types.ObjectId }],
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Users", usersSchema);
