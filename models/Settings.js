const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  params: {
    type: String,
    default: "",
  },
  is_active: {
    type: Boolean,
    required: true,
  },
  editable: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Settings", settingsSchema);
