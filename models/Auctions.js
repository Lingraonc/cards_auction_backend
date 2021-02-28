const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionsSchema = new Schema({
  card_id: { type: Schema.Types.ObjectId, required: true },
  price_start: {
    type: Number,
    required: true,
  },
  min_bet_step: {
    type: Number,
    required: true,
  },
  max_bet: {
    type: Number,
    default: null,
  },
  current_bet: {
    type: Number,
    default: null,
  },
  start_time: {
    type: Date,
    required: true,
  },
  min_extension_time: {
    type: Number,
    required: true,
  },
  max_duration_auction: {
    type: Number,
    required: true,
  },
  extended_to: {
    type: Number,
    required: true,
  },
  is_opened: {
    type: Boolean,
    default: true,
  },
  owner_id: { type: Schema.Types.ObjectId },
  buyer_id: { type: Schema.Types.ObjectId },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Auctions", auctionsSchema);
