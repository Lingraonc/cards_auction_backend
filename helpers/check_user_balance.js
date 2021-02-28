const Users = require("./../models/Users");
const Auctions = require("./../models/Auctions");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  await Users.findById(req.user.id)
    .then(async (user) => {
      await Auctions.aggregate([])
        .match({
          buyer_id: mongoose.Types.ObjectId(req.user.id),
          is_opened: true,
          _id: { $ne: mongoose.Types.ObjectId(req.body.auction_id) },
        })
        .group({
          _id: "$_id",
          current_bet: { $first: "$current_bet" },
        })
        .group({
          _id: null,
          betsSum: { $sum: "$current_bet" },
        })
        .project({
          _id: 1,
          betsSum: 1,
        })
        .then((result) => {
          let avaible_balance;
          if (result.length) {
            avaible_balance =
              parseInt(user.balance) -
              (parseInt(result[0].betsSum) + parseInt(req.body.bet));
          } else {
            avaible_balance = parseInt(user.balance) - parseInt(req.body.bet);
          }
          console.log("Avaible user balance: " + avaible_balance);
          if (avaible_balance >= 0) {
            next();
          } else {
            res
              .status(400)
              .json({ message: "Bet are more than current balance" });
          }
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};
