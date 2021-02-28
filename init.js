const mongoose_connect = require("./mongose_connect.js");
const parsing = require("./controllers/parsing_controller.js");
const init_groups = require("./controllers/init_project_controller.js");
const Groups = require("./models/Groups");
const Users = require("./models/Users");
const Settings = require("./models/Settings");
const bcrypt = require("bcrypt");

mongoose_connect();

async function init() {
  await init_groups.create();
  await parsing.locations_create();
  setTimeout(parsing.episodes_create, 2000);
}
init();
