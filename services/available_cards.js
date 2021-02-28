const Cards = require("../models/Cards.js");
const Settings = require("../models/Settings.js");

module.exports = async function (card_id) {
  //Add card active status
  await Cards.updateOne({ _id: card_id }, { is_active: true });

  //get all cards count and active cards count
  let all_cards_count = await Cards.countDocuments();
  let active_cards_count = await Cards.countDocuments({ is_active: true });

  if (all_cards_count == active_cards_count) {
    await Settings.find({ name: "can_create_cards" })
      .then(async (setting) => {
        setting.is_active = true;
        await setting.save();
      })
      .catch((err) => {
        throw err;
      });
  }
};
