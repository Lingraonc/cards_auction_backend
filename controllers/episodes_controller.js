const Episodes = require("../models/Episodes");

//Show all episodes
//Access: public
exports.index = function (req, res) {
  Episodes.find({}, function (err, episode) {
    if (err) res.send(err);
    res.json(episode);
  });
};

//Show episode by ID
//Access: public
exports.show = function (req, res) {
  Episodes.findById(req.params.id, function (err, episode) {
    if (err) res.send(err);
    res.json(episode);
  });
};

//Update episode by ID
//Access: private
exports.update = function (req, res) {
  Episodes.findById(req.params.id, (err, episode) => {
    if (err) res.send(err);
    episode.name = req.body.name;
    episode.air_date = req.body.air_date;
    episode.episode_number = req.body.episode_number;
    episode
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

//remove episode by ID
//Access: private
exports.destroy = function (req, res) {
  Episodes.findByIdAndDelete(req.params.id, function (err) {
    if (err) res.send(err);
    res.json({ message: `Element id: ${req.params.id} successfull deleted` });
  });
};
