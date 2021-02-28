const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin/is_admin.js");

module.exports = function (app) {
  const controller = require("../controllers/locations_controller");

  app.get("/locations", auth, controller.index);
  app
    .get("/locations/:id", auth, controller.show)
    .put("/locations/:id", auth, is_admin, controller.update)
    .delete("/locations/:id", auth, is_admin, controller.destroy);
};
