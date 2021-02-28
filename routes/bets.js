const auth = require("../helpers/auth.js");
const check_user_balance = require("../helpers/check_user_balance.js");
const is_bet_valid = require("../helpers/is_bet_valid.js");

module.exports = function (app) {
  const controller = require("../controllers/bets_controller");

  app.get("/bets", auth, check_user_balance, controller.index);
  app.post("/bets", auth, check_user_balance, is_bet_valid, controller.create);
};
