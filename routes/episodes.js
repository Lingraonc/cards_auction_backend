const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin/is_admin.js");

module.exports = function (app) {
  const controller = require("../controllers/episodes_controller");

  app.get("/episodes", auth, controller.index);
  app
    .get("/episodes/:id", auth, controller.show)
    .put("/episodes/:id", auth, is_admin, controller.update)
    .delete("/episodes/:id", auth, is_admin, controller.destroy);
};
