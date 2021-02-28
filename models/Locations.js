const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  dimension: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Locations", locationsSchema);
