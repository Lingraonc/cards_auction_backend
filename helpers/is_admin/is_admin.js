let check_by_id = require("./check_by_id");

module.exports = async (req, res, next) => {
  let result = await check_by_id(req.user.id);
  if (result !== null) {
    if (!result[0].groups_list.some((e) => e.name === "Admin")) {
      //check if next exist -> return response
      res.status(400).json({ message: "Not allowed for this user" });
      return false;
    } else {
      req.user.admin = true;

      next();
      return true;
    }
  }
  res.status(400).json({ message: "Not allowed for this user" });
  return false;
};
