const jwt = require("jsonwebtoken");
const jwt_secret = require("../../vercel.json").env.jwtSecret;

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }

    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "No authorization" });
  }
};
