const Locations = require("../models/Locations");

//Show all locations
//Access: public
exports.index = function (req, res) {
  Locations.find({}, function (err, location) {
    if (err) res.send(err);
    res.json(location);
  });
};

//Show location by ID
//Access: public
exports.show = function (req, res) {
  Locations.findById(req.params.id, function (err, location) {
    if (err) res.send(err);
    res.json(location);
  });
};

//Update location by ID
//Access: private
exports.update = function (req, res) {
  Locations.findById(req.params.id, (err, location) => {
    if (err) res.send(err);
    location.name = req.body.name;
    location.type = req.body.type;
    location.dimension = req.body.dimension;
    location
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

//remove location by ID
//Access: private
exports.destroy = function (req, res) {
  Locations.findByIdAndDelete(req.params.id, function (err) {
    if (err) res.send(err);
    res.json({ message: `Element id: ${req.params.id} successfull deleted` });
  });
};
