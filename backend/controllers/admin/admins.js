const { User } = require("../../models");

const ResponseHelper = require("../../helpers/response");

module.exports = {
  getAdmins: async (req, res) => {
    const admins = await User.findAll({ where: { user_type: "admin" } });

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        admins: admins.map((admin) => ResponseHelper.removePassword(admin)),
      })
    );
  },
};
