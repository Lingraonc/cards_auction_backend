const Users = require("../models/Users.js");
const Sets = require("../models/Sets.js");
const validation_functions = require("../helpers/validation_functions.js");

module.exports = async function (user_id = []) {
  let users;
  if (user_id !== null) {
    users = await Users.find({ _id: { $in: user_id } });
  } else {
    users = await Users.find({});
  }
  let sets = await Sets.find({});
  for (let i = 0; i < users.length; i++) {
    let rating = users[i].cards.length;
    let user_sets = [];
    for (const single_set of sets) {
      let set_data = {
        set_id: single_set._id,
        cards: [],
      };

      for (const user_card of users[i].cards) {
        if (single_set.cards.indexOf(user_card) !== -1) {
          set_data.cards.push(user_card.toString());
        }
      }
      set_data.cards = validation_functions.remove_duplicates(set_data.cards);
      if (single_set.cards.length === set_data.cards.length) {
        rating += parseInt(single_set.rating);
        user_sets.push(single_set._id);
      }
    }
    await Users.updateOne(
      { _id: users[i]._id },
      { rating: rating, sets: user_sets }
    );
  }
};
