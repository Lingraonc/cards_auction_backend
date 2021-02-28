const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Groups", groupsSchema);
