const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin/is_admin.js");

module.exports = function (app) {
  const controller = require("../controllers/settings_controller");

  // ***Settings fields***
  // project_inited
  // default_user_group : "User",
  // can_create_cards: false,
  // time_token_expired: seconds,

  app
    .get("/settings", auth, is_admin, controller.index)
    .post("/settings", auth, is_admin, controller.create);
  app
    .get("/settings/:id", auth, is_admin, controller.show)
    .put("/settings/:id", auth, is_admin, controller.update);
};
