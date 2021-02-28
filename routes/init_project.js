module.exports = function (app) {
  const controller = require("../controllers/init_project_controller");

  app.post("/init_project", controller.create);
};
