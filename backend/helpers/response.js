const _ = require("lodash");

const ResponseHelper = {
  removePassword: (user) => {
    const { password, ...rest } = user.dataValues;
    return rest;
  },
  generateResponse: (code, message, data) => {
    const response = { meta: { code, message }, data };
    if (_.isNil(data)) {
      delete response.data;
    }
    return response;
  },

  generateNotFoundResponse: (name) =>
    ResponseHelper.generateResponse(404, `${name || "Object"} not found`),
};

module.exports = ResponseHelper;
