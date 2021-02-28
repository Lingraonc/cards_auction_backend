const multer = require("multer");
const path = require("path");
const fs = require("fs");

//TODO validate for image type
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "uploads",
      `${Date.now()}`
    );
    fs.mkdirSync(uploadsDir);
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

module.exports.send = (req, res, next) => {
  return upload.single("image")(req, res, () => {
    next();
  });
};
