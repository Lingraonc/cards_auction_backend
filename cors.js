module.exports = function (app) {
  const cors = require("cors");
  const corsOptions = {
    origin: function (origin, callback) {
      if (
        require("./../vercel.json")
          .env.CORSE_WHITELIST.split(" ")
          .indexOf(origin) !== -1
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS configs"));
      }
    },
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  };
  const publicOptions = {
    origin: function (origin, callback) {
      callback(null, true);
    },
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  };
  app.options("*", cors(publicOptions));
  app.use(cors(publicOptions));
  app.use("/public", cors(publicOptions));
};
