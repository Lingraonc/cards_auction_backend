const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  episodes: [{ type: Schema.Types.ObjectId }],
  locations: [{ type: Schema.Types.ObjectId }],
  status: {
    type: String,
    required: true,
  },
  person_type: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Cards", cardsSchema);
