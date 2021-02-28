let Auctions = require("../models/Auctions.js");
let Bets = require("../models/Bets.js");
let validation = require("./validation_functions.js");

module.exports = async (req, res, next) => {
  try {
    if (!validation.valid_ids(req.body.auction_id)) {
      res.status(404).json({ message: "Error, auction id_format incorrect!" });
      return;
    }
    let auction = await Auctions.findById(req.body.auction_id);
    let prev_bet;
    //if auction id found
    if (auction === null) {
      res.status(404).json({ message: "Auction not found!" });
      return;
    }

    //if buyer exist
    if ("buyer_id" in auction) {
      if (parseInt(req.body.bet) <= parseInt(auction.current_bet)) {
        res
          .status(400)
          .json({ message: "Your bet is less than the current one" });
        return;
      }
      if (
        parseInt(req.body.bet) <
        parseInt(auction.current_bet) + parseInt(auction.min_bet_step)
      ) {
        res
          .status(400)
          .json({ message: "Your bet does not meet the minimum step" });
        return;
      }

      if (
        auction.max_bet !== null &&
        parseInt(req.body.bet) >= parseInt(auction.max_bet) &&
        parseInt(auction.current_bet) >= parseInt(auction.max_bet)
      ) {
        res
          .status(400)
          .json({ message: "You cannot bet more than the maximum bet" });
        return;
      }
    } else {
      //if bets not found
      if (parseInt(auction.price_start) > parseInt(req.body.bet)) {
        res.status(400).json({
          message: "Your bet does not meet the start bet",
        });
        return;
      }
    }
    next();
  } catch (err) {
    throw err;
  }
};
