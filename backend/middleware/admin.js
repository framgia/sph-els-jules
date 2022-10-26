const ResponseHelper = require("../helpers/response");

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.userType !== "admin") {
      return res.send(
        ResponseHelper.generateResponse(
          401,
          "Unauthorized access (Admin required)"
        )
      );
    }

    next();
  },
};
