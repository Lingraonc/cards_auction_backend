const Settings = require("../models/Settings");

exports.default_user_group = async () => {
  let setting = await Settings.findOne({ name: "default_user_group" });
  return setting !== null ? setting.params : null;
};

exports.can_create_cards = async () => {
  let setting = await Settings.findOne({ name: "can_create_cards" });
  return setting !== null ? setting.is_active : null;
};

exports.time_token_expired = async () => {
  let setting = await Settings.findOne({ name: "time_token_expired" });
  return setting !== null ? setting.params : null;
};

exports.project_inited = async () => {
  let setting = await Settings.findOne({ name: "project_inited" });
  return setting !== null ? setting.is_active : null;
};
