const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin/is_admin.js");

module.exports = function (app) {
  const controller = require("../controllers/users_controller");

  app.post("/add_user_group", auth, is_admin, controller.getUserGroup);
  app.post("/remove_user_group", auth, is_admin, controller.removeUserGroup);
};
