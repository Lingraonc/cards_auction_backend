const Users = require("./../../models/Users");
const mongoose = require("mongoose");
let check_by_id = require("../../helpers/is_admin/check_by_id.js");

module.exports = async function (req, res) {
  let result = await check_by_id(req.user.id);
  if (!result[0].groups_list.some((e) => e.name === "Admin")) {
    let user_id = req.user.id;
    let card_id =
      typeof req.body.card_id !== "undefined" ? req.body.card_id : 0;
    let result = Users.findById(user_id)
      .then((user) => {
        if (!user) res.status(404).json({ message: "User not found!" });
        //find card in cards array
        let card_index = user.cards.indexOf(card_id);
        if (card_index >= 0) {
          //remove card_id from cards array
          user.cards.splice(card_index, 1);
          //add card_id to blocked_cards array
          user.blocked_cards.push(card_id);
          user.markModified("cards");
          user.markModified("blocked_cards");
          user.save();
          return true;
        } else {
          res.status(404).json({ message: "User doesnt have this card" });
          return false;
        }
      })
      .catch((err) => {
        throw err;
      });
    return result;
  } else {
    return true;
  }
};
