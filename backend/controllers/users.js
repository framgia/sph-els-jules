const ResponseHelper = require("../helpers/response");
const { User, Activity_log, User_follow } = require("../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({});
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  },
  getActivityLogsByUserId: async (req, res) => {
    const { user_id } = req.query;
    const followedUsers = await User_follow.findAll({
      where: { follower_id: user_id },
    });

    const idList = [+user_id, ...followedUsers.map((user) => user.user_id)];
    const activity_logs = await Activity_log.findAll({
      where: { user_id: idList },
    });

    res.send(
      ResponseHelper.generateResponse(200, "Success", { activity_logs })
    );
  },
};
