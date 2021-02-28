const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const path = require("path");
const mongoose_connect = require("./mongose_connect.js");
var CronJob = require("cron").CronJob;
let auction_checker = require("./services/auction/auction_checker.js");
let calculation_rating = require("./services/calculation_rating.js");

const routes = require("./routes");
const cors = require("./cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

cors(app);
routes(app);
mongoose_connect();

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

var CronJob = require("cron").CronJob;
var job = new CronJob(
  "* * * * * *",
  auction_checker,
  null,
  true,
  "America/Los_Angeles"
);
job.start();

var count_rating = new CronJob(
  "* * 1 * * *",
  calculation_rating,
  null,
  true,
  "America/Los_Angeles"
);
count_rating.start();
