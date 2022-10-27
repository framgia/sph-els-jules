const _ = require("lodash");
const jwt = require("jsonwebtoken");

const ResponseHelper = require("../helpers/response");

module.exports = {
  verifyToken: (req, res, next) => {
    const { authorization } = req.headers;

    if (_.isNil(authorization)) {
      return res.send(
        ResponseHelper.generateResponse(401, "Missing Bearer token")
      );
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.send(
        ResponseHelper.generateResponse(401, "Invalid Bearer token")
      );
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return ResponseHelper.generateResponse(401, "Unauthorized access");
      }

      req.currentUserId = decoded.id;
      req.userType = decoded.type;
      next();
    });
  },
};
