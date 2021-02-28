const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  transaction_type: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Transactions", transactionsSchema);
