const _ = require("lodash");

const ResponseHelper = {
  removePassword: (user) => {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar_url: user.avatar_url,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
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
