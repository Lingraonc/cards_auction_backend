const Auctions = require("./../../models/Auctions.js");
const Users = require("./../../models/Users.js");
const mongoose = require("mongoose");
const card_to_buyer = require("./card_to_buyer.js");
const return_card = require("./return_card.js");

module.exports = async function (auctions) {
  for await (const auction of auctions) {
    let buy_data = await Auctions.aggregate([])
      .match({ _id: auction._id })
      .project({
        buyer_id: 1,
        current_bet: 1,
        owner_id: 1,
        auction_id: 1,
        card_id: 1,
      })
      .sort({ maxBet: -1 })
      .limit(1);
    //THIS AUCTION STATUS CLOSED
    if ("buyer_id" in buy_data[0]) {
      card_to_buyer(buy_data[0]);
    } else {
      //RETURN CARD TO OWNER
      return_card(auction);
    }
    await Auctions.findById(auction)
      .then((auction) => {
        auction.is_opened = false;
        auction.save();
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
};
