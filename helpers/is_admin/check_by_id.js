const Users = require("./../../models/Users");
const mongoose = require("mongoose");

module.exports = async function (user_id) {
  let isAdmin = await Users.aggregate([])
    .match({ _id: mongoose.Types.ObjectId(user_id) })
    .lookup({
      from: "groups",
      localField: "groups",
      foreignField: "_id",
      as: "groups_list",
    })
    .project({
      "groups_list.name": 1,
    })
    .then((result) => {
      if (result.length !== 0) {
        return result;
      }
      return null;
    })
    .catch((err) => {
      throw err;
    });
  return isAdmin;
};
