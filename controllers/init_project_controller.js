const Groups = require("../models/Groups");
const Users = require("../models/Users");
const Settings = require("../models/Settings");
const bcrypt = require("bcrypt");
const settings = require("../helpers/settings");

//Create start tables
//Access: private
exports.create = async function (req, res) {
  try {
    //check if setting project_inited are exist
    let project_init_setting = await settings.project_inited();
    console.log(project_init_setting);
    if (project_init_setting === null) {
      //create admins group
      const adminGroup = new Groups({
        name: "Admin",
        is_active: true,
      });
      await adminGroup.save();
      //create new user
      const newUser = new Users({
        name: "Admin",
        email: "test@test.ru",
        password: "password",
        groups: [await adminGroup._id],
      });
      //password generate
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          await newUser.save();
        });
      });
      //create users group
      const usersGroup = new Groups({
        name: "User",
        is_active: true,
      });
      await usersGroup.save();
      //Create default settings
      let newSettings = [
        {
          name: "default_user_group",
          params: "User",
          is_active: true,
          editable: true,
        },
        {
          name: "can_create_cards",
          params: "",
          is_active: false,
          editable: true,
        },
        {
          name: "time_token_expired",
          params: "380000",
          is_active: true,
          editable: true,
        },
        {
          name: "project_inited",
          params: "",
          is_active: true,
          editable: false,
        },
      ];
      await Settings.insertMany(newSettings)
        .then((result) => {
          //res.json({ newUser, adminGroup, usersGroup, newSettings });
        })
        .catch((err) => {
          //if (err) res.json(err);
        });
    } else {
      //res.json({ message: "Project alredy inited" });
    }
  } catch (err) {
    //console.log(err);
  }
};
