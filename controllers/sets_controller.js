const Sets = require("../models/Sets");
const Cards = require("../models/Cards");
const validations = require("../helpers/validation_functions.js");

//Show all episodes
//Access: public
exports.index = function (req, res) {
  Sets.find({}, function (err, set) {
    if (err) res.send(err);
    res.json(set);
  });
};

//Show set by ID
//Access: public
exports.show = function (req, res) {
  Sets.findById(req.params.id, function (err, set) {
    if (err) res.send(err);
    res.json(set);
  });
};

//Create set
//Access: private
exports.create = async function (req, res) {
  try {
    const name = req.body.name;
    if (!validations.valid_ids(req.body.cards)) {
      res.status(400).json({ message: "Error invalid ids" });
      return;
    }

    const cards = req.body.cards;
    const rating = req.body.rating;

    if (cards.length < 2) {
      res
        .status(400)
        .json({ message: "You cannot create a set with less than two cards" });
      return;
    }

    if (!(await check_cards(req, res))) return;

    const set = new Sets({
      name,
      cards,
      rating,
    });
    await set
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    throw err;
  }
};

//check is all cards in array are exists in db
async function check_cards(req, res) {
  const cards_array = req.body.cards;
  const cards = await Cards.find({
    _id: { $in: validations.remove_duplicates(cards_array) },
  });
  if (cards_array.length !== cards.length) {
    res
      .status(404)
      .json({ message: "Cards not found or cards array have duplicates" });
    return false;
  }
  return true;
}

//Update set by ID
//Access: private
exports.update = async function (req, res) {
  if (!validations.valid_ids(req.body.cards)) {
    res.status(400).json({ message: "Error invalid ids" });
    return;
  }

  if (req.body.cards.length < 2) {
    res
      .status(400)
      .json({ message: "You cannot create a set with less than two cards" });
    return;
  }

  if (!(await check_cards(req, res))) return;

  Sets.findById(req.params.id, (err, set) => {
    if (err) res.send(err);
    set.name = req.body.name;
    set.cards = req.body.cards;
    set.rating = req.body.rating;
    set.markModified("cards");
    set
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

//remove set by ID
//Access: private
exports.destroy = function (req, res) {
  Sets.findByIdAndDelete(req.params.id, function (err) {
    if (err) res.send(err);
    res.json({ message: `Element id: ${req.params.id} successfull deleted` });
  });
};
