const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  air_date: {
    type: Date,
    required: true,
  },
  episode_number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Episodes", episodesSchema);
