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

const _getActivities = async (idList) => {
  return await Activity_log.findAll({
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
};

const _addLessonScore = async (activity_logs) => {
  return await Promise.all(
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
};

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
    let activity_logs = await _getActivities(idList);
    activity_logs = activity_logs.sort((a, b) => b.updatedAt - a.updatedAt);
    activity_logs = await _addLessonScore(activity_logs);

    res.send(
      ResponseHelper.generateResponse(200, "Success", { activity_logs })
    );
  },
  getLearningsCountByUserId: async (req, res) => {
    const { user_id } = req.query;

    const activity_logs = await Activity_log.findAll({
      where: { user_id },
      include: [
        {
          model: Lesson,
          attributes: ["id", "title"],
          include: [
            {
              model: Result,
              where: { user_id },
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "first_name", "last_name", "email"],
        },
      ],
    });

    const learnedLessons = activity_logs.reduce((count, activity) => {
      if (activity.relatable_type === "lesson") return count + 1;
      return count;
    }, 0);

    const learnedWords = activity_logs.reduce((count, activity) => {
      if (activity.relatable_type === "lesson") {
        const {
          Lesson: { Results },
        } = activity;

        // Count the correct answers per lesson
        const correctAnswers = Results.reduce((count, result) => {
          if (result.is_correct) return count + 1;
          return count;
        }, 0);

        return correctAnswers;
      }
      return count;
    }, 0);

    const { User: user } = activity_logs[0];

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        learnedLessons,
        learnedWords,
        user,
      })
    );
  },
  getUserProfile: async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res.send(ResponseHelper.generateResponse(400, "Missing query id"));
    }

    const user = await User.findByPk(user_id, {
      attributes: ["id", "first_name", "last_name", "email"],
    });

    if (!user) {
      return res.send(ResponseHelper.generateNotFoundResponse("User"));
    }

    const followers = await User_follow.findAll({
      where: { user_id },
      include: {
        model: User,
        as: "Follower",
        attributes: ["id", "first_name", "last_name"],
      },
    });
    const following = await User_follow.findAll({
      where: {
        follower_id: user_id,
      },
      include: {
        model: User,
        as: "Following",
        attributes: ["id", "first_name", "last_name"],
      },
    });

    let activity_logs = await _getActivities(user_id);
    activity_logs = activity_logs.sort((a, b) => b.updatedAt - a.updatedAt);
    activity_logs = await _addLessonScore(activity_logs);

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        user,
        followers,
        following,
        activity_logs,
      })
    );
  },
};
