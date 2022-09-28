const ResponseHelper = require("../helpers/response");
const {
  User,
  Activity_log,
  User_follow,
  Result,
  Lesson,
  Lesson_word,
  Word,
} = require("../models");

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
    let activity_logs = await Activity_log.findAll({
      where: { user_id: idList },
      include: [
        {
          model: User_follow,
          include: [
            {
              model: User,
              as: "Follower",
              attributes: ["first_name", "last_name"],
            },
            {
              model: User,
              as: "Following",
              attributes: ["first_name", "last_name"],
            },
          ],
        },
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
        {
          model: Lesson,
          attributes: ["id", "title"],
          include: [
            {
              model: Lesson_word,
            },
          ],
        },
      ],
    });
    activity_logs = activity_logs.sort((a, b) => b.updatedAt - a.updatedAt);

    activity_logs = await Promise.all(
      activity_logs.map(async (al) => {
        if (al.relatable_type === "lesson") {
          const newAl = JSON.parse(JSON.stringify(al));
          const results = await Result.findAll({
            where: { lesson_id: al.Lesson.id, user_id: al.user_id },
          });
          const score = results.reduce((score, question) => {
            if (question.is_correct) return score + 1;
            return score;
          }, 0);
          newAl.score = score;
          newAl.item_count = al.Lesson.Lesson_words.length;
          return newAl;
        }
        return al;
      })
    );

    res.send(
      ResponseHelper.generateResponse(200, "Success", { activity_logs })
    );
  },
};
