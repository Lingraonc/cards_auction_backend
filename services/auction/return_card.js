let Users = require("../../models/Users.js");
let check_by_id = require("../../helpers/is_admin/check_by_id.js");

module.exports = async function (auction_id) {
  //return card to owner
  let result = await check_by_id(auction_id.owner_id);
  if (!result[0].groups_list.some((e) => e.name === "Admin")) {
    await Users.findById(auction_id.owner_id)
      .then((user) => {
        if (!user) throw "Owner not found!";
        //find card in cards array
        let card_index = user.blocked_cards.indexOf(auction_id.card_id);
        if (card_index >= 0) {
          user.blocked_cards.splice(card_index, 1);
          user.cards.push(auction_id.card_id);

          user.markModified("blocked_cards");
          user.markModified("cards");
          user.save();
        } else {
          throw "Error, owner doesnt have this card!";
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
};
