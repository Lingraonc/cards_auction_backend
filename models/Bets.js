const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const betsSchema = new Schema({
  auction_id: { type: Schema.Types.ObjectId, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  bet: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Bets", betsSchema);
