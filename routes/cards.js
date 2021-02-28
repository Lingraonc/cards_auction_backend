const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin/is_admin.js");
const image = require("../helpers/images.js");

module.exports = function (app) {
  const controller = require("../controllers/cards_controller");
  app
    .get("/cards", auth, controller.index)
    .post("/cards", auth, is_admin, image.send, controller.create);
  app
    .get("/cards/:id", auth, controller.show)
    .put("/cards/:id", auth, is_admin, image.send, controller.update)
    .delete("/cards/:id", auth, is_admin, controller.destroy);
};
