const Auctions = require("../models/Auctions");
const Users = require("../models/Users");
const e = require("express");
const card_to_blocked = require("../services/auction/card_to_blocked.js");

//Show all auctions
//Access: public
exports.index = function (req, res) {
  Auctions.find({}, function (err, group) {
    if (err) res.send(err);
    res.json(group);
  });
};

//Create new auctions
//Access: private
exports.create = async function (req, res) {
  const card_id = req.body.card_id;
  const price_start = req.body.price_start;
  const max_duration_auction = req.body.max_duration_auction;
  const max_bet = req.body.max_bet;
  const min_extension_time = req.body.min_extension_time;
  const min_bet_step = req.body.min_bet_step;
  const owner_id = req.user.id;
  const start_time = Date.now();
  const extended_to = parseInt(start_time) + parseInt(max_duration_auction);

  //TODO validate fields before save
  let is_card_blocked = await card_to_blocked(req, res);
  if (!is_card_blocked) return;
  const newAuction = new Auctions({
    card_id,
    price_start,
    max_duration_auction,
    max_bet,
    min_extension_time,
    min_bet_step,
    owner_id,
    start_time,
    extended_to,
  });
  newAuction
    .save()
    .then((auction) => {
      console.log("Auction succesfull created!");
      //addToAuctionsArray(auction);
      res.json(auction);
    })
    .catch((err) => {
      res.json(err);
    });
};
