const { User } = require("../../models");

const ResponseHelper = require("../../helpers/response");

module.exports = {
  getAdmins: async (req, res) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const offset = limit * (page - 1);

    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      where: { user_type: "admin" },
    });

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        page,
        limit,
        count,
        admins: rows.map((admin) => ResponseHelper.removePassword(admin)),
      })
    );
  },
};
