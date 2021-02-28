const Users = require("../models/Users.js");
const validations = require("../helpers/validation_functions");

exports.getUserGroup = function (req, res) {
  const user_id = validations.valid_ids(req.body.user_id)
    ? req.body.user_id
    : null;
  const group_id = validations.valid_ids(req.body.group_id)
    ? req.body.group_id
    : null;
  if (user_id !== null) {
    Users.findById(user_id)
      .then((user) => {
        user.groups.push(group_id);
        user.groups = validations.remove_duplicates(user.groups);
        user.markModified("groups");
        user
          .save()
          .then((result) => {
            res.json("User group successfull added!");
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

exports.removeUserGroup = function (req, res) {
  const user_id = validations.valid_ids(req.body.user_id)
    ? req.body.user_id
    : null;
  const group_id = validations.valid_ids(req.body.group_id)
    ? req.body.group_id
    : null;
  if (user_id !== null) {
    Users.findById(user_id)
      .then((user) => {
        let group_index = user.groups.indexOf(group_id);
        if (group_index >= 0) {
          user.groups.splice(group_index, 1);

          user.markModified("groups");
          user
            .save()
            .then((result) => {
              res.json("User group successfull deleted!");
            })
            .catch((err) => {
              res.send(err);
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
};
