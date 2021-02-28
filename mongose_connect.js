const mongoose = require("mongoose");
const mongoose_secret = require("./../vercel.json").env.MongoDB;
const uri = mongoose_secret;

module.exports = function () {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
};
