const bcrypt = require("bcrypt");

const ResponseHelper = require("../helpers/response");
const {
  User,
  Activity_log,
  User_follow,
  Result,
  Lesson,
  Lesson_word,
} = require("../models");

const salt = 11;

const includeUserFollow = [
  {
    model: User_follow,
    include: [
      {
        model: User,
        as: "Follower",
        attributes: ["id", "first_name", "last_name", "email"],
      },
      {
        model: User,
        as: "Following",
        attributes: ["id", "first_name", "last_name", "email"],
      },
    ],
  },
  {
    model: User,
    attributes: ["id", "first_name", "last_name", "email"],
  },
];

const getActivities = async (idList) => {
  return await Activity_log.findAll({
    where: { user_id: idList },
    include: [
      ...includeUserFollow,
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

const addLessonScore = async (activity_logs) => {
  return await Promise.all(
    activity_logs.map(async (activity_log) => {
      if (activity_log.relatable_type === "lesson") {
        const newActivityLog = JSON.parse(JSON.stringify(activity_log));
        const { user_id, Lesson } = newActivityLog;

        const results = await Result.findAll({
          where: {
            lesson_id: Lesson.id,
            user_id: user_id,
          },
        });
        const score = results.reduce((score, question) => {
          if (question.is_correct) return score + 1;
          return score;
        }, 0);

        newActivityLog.score = score;
        newActivityLog.item_count = Lesson.Lesson_words.length;

        return newActivityLog;
      }
      return activity_log;
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
  updateProfileById: async (req, res) => {
    const { id } = req.query;
    const {
      first_name,
      last_name,
      email,
      current_password,
      new_password,
      avatar_url,
    } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.send(ResponseHelper.generateNotFoundResponse("User"));
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.send(
        ResponseHelper.generateResponse(404, "Email is already in use")
      );
    }

    const passwordIsCorrect = await bcrypt.compare(
      current_password,
      user.password
    );
    if (!passwordIsCorrect) {
      return res.send(
        ResponseHelper.generateResponse(404, "Password is incorrect!")
      );
    }
    const hash = await bcrypt.hash(new_password, salt);

    user.set({
      first_name,
      last_name,
      email,
      password: hash,
      avatar_url,
    });
    await user.save();

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar_url: user.avatar_url,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      })
    );
  },
  getActivityLogsByUserId: async (req, res) => {
    const { user_id } = req.query;
    const followedUsers = await User_follow.findAll({
      where: { follower_id: user_id, is_followed: true },
    });

    const idList = [+user_id, ...followedUsers.map((user) => user.user_id)];
    let activity_logs = await getActivities(idList);
    activity_logs = activity_logs.sort((a, b) => b.updatedAt - a.updatedAt);
    activity_logs = await addLessonScore(activity_logs);

    res.send(
      ResponseHelper.generateResponse(200, "Success", { activity_logs })
    );
  },
  getLearningsCountByUserId: async (req, res) => {
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

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        learnedLessons,
        learnedWords,
        user,
      })
    );
  },
  getUserProfileByUserId: async (req, res) => {
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
      where: { user_id, is_followed: true },
      include: {
        model: User,
        as: "Follower",
        attributes: ["id", "first_name", "last_name", "email"],
      },
    });

    const following = await User_follow.findAll({
      where: {
        follower_id: user_id,
        is_followed: true,
      },
      include: {
        model: User,
        as: "Following",
        attributes: ["id", "first_name", "last_name", "email"],
      },
    });

    let activity_logs = await getActivities(user_id);
    activity_logs = activity_logs.sort((a, b) => b.updatedAt - a.updatedAt);
    activity_logs = await addLessonScore(activity_logs);

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        user,
        followers,
        following,
        activity_logs,
      })
    );
  },
  toggleFollow: async (req, res) => {
    const { follower_id, following_id } = req.body;

    if (!follower_id || !following_id) {
      return res.send(
        ResponseHelper.generateResponse(400, "Missing follower or following id")
      );
    }

    const follower = await User.findByPk(follower_id);
    if (!follower) {
      return res.send(ResponseHelper.generateNotFoundResponse("Follower"));
    }

    const following = await User.findByPk(following_id);
    if (!following) {
      return res.send(ResponseHelper.generateNotFoundResponse("Following"));
    }

    let user_follow = await User_follow.findOne({
      where: { user_id: following_id, follower_id },
    });
    let activity_log;

    if (!user_follow) {
      user_follow = await User_follow.create({
        user_id: following_id,
        follower_id,
        is_followed: true,
      });

      activity_log = await Activity_log.create({
        user_id: follower_id,
        relatable_id: user_follow.id,
        relatable_type: "follow",
      });

      activity_log = await Activity_log.findOne({
        where: { id: activity_log.id },
        include: includeUserFollow,
      });
    } else {
      user_follow.set({
        is_followed: !user_follow.is_followed,
      });

      await user_follow.save();

      activity_log = await Activity_log.create({
        user_id: follower_id,
        relatable_id: user_follow.id,
        relatable_type: user_follow.is_followed ? "follow" : "unfollow",
      });

      activity_log = await Activity_log.findOne({
        where: { id: activity_log.id },
        include: includeUserFollow,
      });
    }

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        user_follow,
        activity_log,
      })
    );
  },
};
