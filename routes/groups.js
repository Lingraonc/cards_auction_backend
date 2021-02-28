const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin/is_admin.js");

module.exports = function (app) {
  const controller = require("../controllers/groups_controller");

  app
    .get("/groups_managements", auth, is_admin, controller.index)
    .post("/groups_managements", auth, is_admin, controller.create);

  app
    .get("/groups_managements/:id", auth, is_admin, controller.show)
    .put("/groups_managements/:id", auth, is_admin, controller.update)
    .delete("/groups_managements/:id", auth, is_admin, controller.destroy);
};
