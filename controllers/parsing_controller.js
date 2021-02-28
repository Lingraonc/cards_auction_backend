const Cards = require("../models/Cards");
const Locations = require("../models/Locations");
const Episodes = require("../models/Episodes");
const axios = require("axios");
const { default: Axios } = require("axios");
const e = require("express");

//Cards
exports.cards_index = function (req, res) {
  Cards.find({}, async function (err, cards) {
    //if (err) res.send(err);
    //res.json(cards);
  });
};

async function createCards(req, res, episodes) {
  getCards("https://rickandmortyapi.com/api/character/", episodes)
    .then((results_array) => {
      //add data in variables
      Cards.insertMany(results_array).then((result) => {
        console.log("Cards successfull saved!");
        //res.json("Cards successfull saved!");
      });
    })
    .catch((err) => {
      //if (err) res.send(err);
    });
}

//returns cards array for saving
async function getCards(url, episodes_array) {
  var items_array = [];
  await axios.get(url).then(async (response) => {
    for (const result of response.data.results) {
      //get array id location by name
      let locations = await getLocationId(result.location.name);
      //get array episodes id by episodes url
      let episodes = [];
      let episodes_names = await getEpisodesId(result.episode);
      for (let i = 0; i < episodes_names.length; i++) {
        for (let j = 0; j < episodes_array.length; j++) {
          if (episodes_names[i] == episodes_array[j].name) {
            episodes.push(episodes_array[j]._id);
          }
        }
      }

      items_array.push({
        name: result.name,
        gender: result.gender,
        species: result.species,
        image: result.image,
        episodes: episodes,
        locations: locations,
        status: result.status,
        person_type:
          typeof result.person_type === "undefined" ? null : result.person_type,
        is_active: false,
      });
    }
    //check for next page
    if (response.data.info.next !== null) {
      let result = await getCards(response.data.info.next, episodes_array);
      items_array = items_array.concat(items_array, result);
    }
  });
  items_array = remove_duplicates(items_array);
  return items_array;
}

//returns location id by location name
async function getLocationId(location_name) {
  let locations = await Locations.findOne({ name: location_name });
  return locations === null ? null : locations._id;
}

//returns array episodes id by url
async function getEpisodesId(episodes_array) {
  var episodes_names = [];
  for await (let episode_url of episodes_array) {
    let episode_name = await axios.get(episode_url).then(async (response) => {
      return response.data.name;
    });
    episodes_names.push(episode_name);
  }
  return episodes_names;
}

//Locations
exports.locations_index = function (req, res) {
  Locations.find({}, function (err, cards) {
    //if (err) res.send(err);
    //res.json(cards);
  });
};

exports.locations_create = async function (req, res) {
  getLocations("https://rickandmortyapi.com/api/location/")
    .then((results_array) => {
      results_array.forEach((result) => {
        //add data in variables
        const name = result.name;
        const type = result.type;
        const dimension = result.dimension;

        const newLocation = new Locations({
          name,
          type,
          dimension,
        });
        //save new location
        newLocation.save(function (err) {
          //if (err) res.send(err);
        });
      });
      console.log("Locations successfull saved!");
      //res.json("Locations successfull saved!");
    })
    .catch((err) => {
      //if (err) res.send(err);
    });
};
//return location arrays for saving
async function getLocations(url) {
  var items_array = [];
  await axios.get(url).then(async (response) => {
    response.data.results.forEach((result) => {
      items_array.push({
        name: result.name,
        type: result.type,
        dimension: result.dimension,
      });
    });
    //check for next page
    if (response.data.info.next !== null) {
      let result = await getLocations(response.data.info.next);
      items_array = items_array.concat(items_array, result);
    }
  });
  items_array = remove_duplicates(items_array);
  return items_array;
}

//Episodes
exports.episodes_index = function (req, res) {
  Episodes.find({}, function (err, episodes) {
    //if (err) res.send(err);
    res.json(episodes.length);
  });
};

exports.episodes_create = async function (req, res) {
  getEpisodes("https://rickandmortyapi.com/api/episode/")
    .then((results_array) => {
      Episodes.insertMany(results_array).then(async (episodes) => {
        await createCards(req, res, episodes);
      });
      console.log("Episodes successfull saved!");
      exports.cards_index;
      //res.json("Episodes successfull saved!");
    })
    .catch((err) => {
      throw err;
    });
};

//return episodes arrays for saving

async function getEpisodes(url) {
  var items_array = [];
  await axios.get(url).then(async (response) => {
    response.data.results.forEach((result) => {
      items_array.push({
        name: result.name,
        air_date: result.air_date,
        episode_number: result.episode,
      });
    });
    if (response.data.info.next !== null) {
      let result = await getEpisodes(response.data.info.next);
      items_array = items_array.concat(items_array, result);
    }
  });
  items_array = remove_duplicates(items_array);
  return items_array;
}

function remove_duplicates(items_array) {
  return items_array.filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
  });
}
