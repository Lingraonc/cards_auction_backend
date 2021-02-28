module.exports = function (app) {
  const controller = require("../controllers/auth/auth_controller");

  app.route("/register").get(controller.index).post(controller.create);
  app.route("/login").post(controller.auth);
};
