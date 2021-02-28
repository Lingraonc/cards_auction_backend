const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin/is_admin.js");

module.exports = function (app) {
  const controller = require("../controllers/auctions_controller.js");

  app
    .get("/auctions", auth, controller.index)
    .post("/auctions", auth, controller.create);
};
