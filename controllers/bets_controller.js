const Bets = require("./../models/Bets.js");
const Auctions = require("./../models/Auctions.js");

//Show all bets
//Access: private
exports.index = function (req, res) {
  Bets.find({}, function (err, bet) {
    if (err) res.send(err);
    res.json(bet);
  });
};

//create new bet
//Access: public
exports.create = async function (req, res) {
  try {
    const user_id = req.user.id;
    const bet = req.body.bet;
    const auction_id = req.body.auction_id;
    let auction = await Auctions.findById(auction_id);
    //if auction alredy over
    if (parseInt(auction.extended_to) < Date.now()) {
      res.status(400).json({ message: "Auction has already ended" });
      return;
    }

    //auction extension
    if (
      parseInt(auction.extended_to) - parseInt(auction.min_extension_time) <
      Date.now()
    ) {
      auction.extended_to = Date.now() + parseInt(auction.min_extension_time);
    }

    auction.buyer_id = user_id;
    auction.current_bet = bet;
    const newBet = new Bets({
      user_id,
      bet,
      auction_id,
    });
    newBet.save().then((result) => {
      auction.save();
      res.json(result);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
