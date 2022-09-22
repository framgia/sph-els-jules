const { User } = require("../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({});
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  },
};
