const Groups = require("../models/Groups");

//Show all groups
//Access: private
exports.index = function (req, res) {
  Groups.find({}, function (err, group) {
    if (err) res.send(err);
    res.json(group);
  });
};

//create new group
//Access: private
exports.create = function (req, res) {
  const newGroup = new Groups(req.body);
  newGroup.save(function (err, group) {
    if (err) res.send(err);
    res.json(group);
  });
};

//Show group by ID
//Access: private
exports.show = function (req, res) {
  Groups.findById(req.params.id, function (err, group) {
    if (err) res.send(err);
    res.json(group);
  });
};

//Update group by ID
//Access: private
exports.update = function (req, res) {
  Groups.findById(req.params.id, (err, group) => {
    if (err) res.send(err);
    group.name = req.body.name;
    group.is_active = req.body.is_active;
    group
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

//remove group by ID
//Access: private
exports.destroy = function (req, res) {
  Groups.findByIdAndDelete(req.params.id, function (err) {
    if (err) res.send(err);
    res.json({ message: `Element id: ${req.params.id} successfull deleted` });
  });
};
