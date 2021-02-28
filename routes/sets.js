const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin/is_admin.js");

module.exports = function (app) {
  const controller = require("../controllers/sets_controller");

  app
    .get("/sets", auth, controller.index)
    .post("/sets", auth, is_admin, controller.create);
  app
    .get("/sets/:id", auth, controller.show)
    .put("/sets/:id", auth, is_admin, controller.update)
    .delete("/sets/:id", auth, is_admin, controller.destroy);
};
