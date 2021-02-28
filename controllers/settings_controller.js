const Settings = require("../models/Settings");

//Show all settings
//Access: private
exports.index = function (req, res) {
  Settings.find({}, function (err, setting) {
    if (err) res.send(err);
    res.json(setting);
  });
};

//create new setting
//Access: private
exports.create = function (req, res) {
  const newSetting = new Settings(req.body);
  newSetting.save(function (err, setting) {
    if (err) res.send(err);
    res.json(setting);
  });
};

//Show setting by ID
//Access: private
exports.show = function (req, res) {
  Settings.findById(req.params.id, function (err, setting) {
    if (err) res.send(err);
    res.json(setting);
  });
};

//Update setting by ID
//Access: private
exports.update = function (req, res) {
  Settings.findById(req.params.id, (err, setting) => {
    if (err) res.send(err);
    setting.name = req.body.name;
    setting.params = req.body.params;
    setting.is_active = req.body.is_active;
    setting
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};
