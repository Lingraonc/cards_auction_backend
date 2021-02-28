const e = require("express");
const mongoose = require("mongoose");
const path = require("path");
//models
const Cards = require("../models/Cards");
const Episodes = require("../models/Episodes");
const Locations = require("../models/Locations");
//helpers
const settings = require("../helpers/settings");
const validations = require("../helpers/validation_functions");

//Show all cards
//Access: public
exports.index = function (req, res) {
  Cards.aggregate([])
    .lookup({
      from: "locations",
      localField: "locations",
      foreignField: "_id",
      as: "locations_list",
    })
    .lookup({
      from: "episodes",
      localField: "episodes",
      foreignField: "_id",
      as: "episodes_list",
    })
    .project({
      _id: 1,
      name: 1,
      gender: 1,
      species: 1,
      image: 1,
      status: 1,
      person_type: 1,
      "locations_list._id": 1,
      "locations_list.name": 1,
      "episodes_list._id": 1,
      "episodes_list.name": 1,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      if (err)
        res.status(404).json({
          message: "Cards not found",
        });
    });
};

//create new card
//Access: private
exports.create = async function (req, res) {
  if (await settings.can_create_cards()) {
    let image;
    if (typeof req.file !== "undefined") {
      const remove = path.join(__dirname, "..", "..", "public");
      const relpath = req.file.path.replace(remove, "");
      image = relpath.split("\\").join("/");
    } else {
      res.status(400).json("Image not uploaded");
      return;
    }
    let isEpisodesValid, isLocationsValid;

    isEpisodesValid = IsElementsValid("episodes", req.body.episodes)
      .then(() => true)
      .catch((err) => {
        res.status(err.status).json(err.message);
        return false;
      });
    if (!isEpisodesValid) return;

    isLocationsValid = IsElementsValid("locations", req.body.locations)
      .then(() => true)
      .catch((err) => {
        res.status(err.status).json(err.message);
        return false;
      });
    if (!isLocationsValid) return;

    const name = req.body.name;
    const gender = req.body.gender;
    const species = req.body.species;
    const episodes = req.body.episodes;
    const locations = req.body.locations;
    const status = req.body.status;
    const person_type = req.body.person_type;

    const newCard = new Cards({
      name,
      gender,
      species,
      image,
      episodes,
      locations,
      status,
      person_type,
    });

    newCard
      .save()
      .then(async (card) => {
        getCard(card._id)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            if (err)
              res.status(404).json({
                message: "Card not found",
              });
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(401).json({
      message:
        "You cannot create a new card until all original cards have been sold",
    });
  }
};

async function getCard(card_id) {
  if (validations.valid_ids(card_id)) {
    let card = await Cards.aggregate([])
      .match({ _id: mongoose.Types.ObjectId(card_id) })
      .lookup({
        from: "locations",
        localField: "locations",
        foreignField: "_id",
        as: "locations_list",
      })
      .lookup({
        from: "episodes",
        localField: "episodes",
        foreignField: "_id",
        as: "episodes_list",
      })
      .project({
        _id: 1,
        name: 1,
        gender: 1,
        species: 1,
        image: 1,
        status: 1,
        person_type: 1,
        "locations_list._id": 1,
        "locations_list.name": 1,
        "episodes_list._id": 1,
        "episodes_list.name": 1,
      });
    return card;
  }
  throw err;
}

//Show card by ID
//Access: public
exports.show = async function (req, res) {
  getCard(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      if (err)
        res.status(404).json({
          message: "Card not found",
        });
    });
};

//Update card by ID
//Access: private
exports.update = function (req, res) {
  Cards.findById(req.params.id, async (err, card) => {
    if (err) res.send(err);

    if (typeof req.file !== "undefined") {
      const remove = path.join(__dirname, "..", "..", "public");
      const relpath = req.file.path.replace(remove, "");
      card.image = relpath.split("\\").join("/");
    }
    let isEpisodesValid, isLocationsValid;

    isEpisodesValid = IsElementsValid("episodes", req.body.episodes)
      .then(() => true)
      .catch((err) => {
        res.status(err.status).json(err.message);
        return false;
      });
    if (!isEpisodesValid) return;

    isLocationsValid = IsElementsValid("locations", req.body.locations)
      .then(() => true)
      .catch((err) => {
        res.status(err.status).json(err.message);
        return false;
      });
    if (!isLocationsValid) return;
    //TODO valid fields
    card.name = req.body.name;
    card.gender = req.body.gender;
    card.species = req.body.species;
    card.episodes = req.body.episodes;
    card.locations = req.body.locations;
    card.status = req.body.status;
    card.person_type = req.body.person_type;
    card
      .save()
      .then(async (card) => {
        getCard(card._id)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            if (err)
              res.status(404).json({
                message: "Card not found",
              });
          });
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

//remove card by ID
//Access: private
exports.destroy = function (req, res) {
  Cards.findByIdAndDelete(req.params.id, function (err) {
    if (err) res.send(err);
    res.status(204).json();
  });
};

//check episode items for existing
async function IsElementsValid(name, items_id_array) {
  if (!Array.isArray(items_id_array)) {
    items_id_array = [items_id_array];
  }
  if (!validations.valid_ids(items_id_array)) {
    throw { status: "400", message: `Invalid ${name} id_format` };
  } else {
    let items = [];
    if (name === "episodes") {
      items = await Episodes.find({
        _id: validations.remove_duplicates(items_id_array),
      }).select("_id");
    }
    if (name === "locations") {
      items = await Locations.find({
        _id: validations.remove_duplicates(items_id_array),
      }).select("_id");
    }
    if (items_id_array.length !== items.length) {
      throw {
        status: "404",
        message: `Element doesnt exist or ${name} array have duplicates`,
      };
    }
    return true;
  }
}
