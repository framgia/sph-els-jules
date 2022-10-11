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

const includeUserFollow = [
  {
    model: User_follow,
    include: [
      {
        model: User,
        as: "Follower",
        attributes: ["id", "first_name", "last_name", "email", "avatar_url"],
      },
      {
        model: User,
        as: "Following",
        attributes: ["id", "first_name", "last_name", "email", "avatar_url"],
      },
    ],
  },
  {
    model: User,
    attributes: ["id", "first_name", "last_name", "email", "avatar_url"],
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

        newActivityLog.score = Result.getScore(results);
        newActivityLog.item_count = Lesson.Lesson_words.length;

        return newActivityLog;
      }
      return activity_log;
    })
  );
};

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.findAll({ where: { user_type: "user" } });

    const newUsers = users.map((user) => {
      return ResponseHelper.removePassword(user);
    });

    res.send(
      ResponseHelper.generateResponse(200, "Success", { users: newUsers })
    );
  },
  getUserById: async (req, res) => {
    const { id } = req.query;

    const user = await User.findByPk(id);
    if (!user) {
      return res.send(ResponseHelper.generateNotFoundResponse("User"));
    }
    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        user: ResponseHelper.removePassword(user),
      })
    );
  },
  updateProfileById: async (req, res) => {
    const {
      user_id,
      first_name,
      last_name,
      email,
      current_password,
      new_password,
    } = req.body;

    const user = await User.validateUser(user_id, email, current_password, res);
    if (!user) return;

    let hash;
    if (current_password && new_password) {
      const salt = 11;
      hash = await bcrypt.hash(new_password, salt);
    }

    let avatar_url;
    if (req.file) {
      avatar_url =
        process.env.BACKEND_URL +
        "/" +
        req.file.path.replace(/\\/g, "/").split("/").slice(1).join("/");
    }

    user.set({
      first_name: first_name ? first_name : user.first_name,
      last_name: last_name ? last_name : user.last_name,
      email: email ? email : user.email,
      password: hash ? hash : user.password,
      avatar_url: avatar_url ? avatar_url : user.avatar_url,
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
      attributes: ["id", "first_name", "last_name", "email", "avatar_url"],
    });

    if (!user) {
      return res.send(ResponseHelper.generateNotFoundResponse("User"));
    }

    const activity_logs = await Activity_log.findAll({
      where: { user_id, relatable_type: "lesson" },
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

    const learnedWords = activity_logs.reduce((count, activity) => {
      const {
        Lesson: { Results },
      } = activity;

      // Count the correct answers per lesson
      const correctAnswers = Results.reduce((count, result) => {
        if (result.is_correct) return count + 1;
        return count;
      }, 0);

      return count + correctAnswers;
    }, 0);

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        learnedLessons: activity_logs.length,
        learnedWords,
      })
    );
  },
  getUserProfileByUserId: async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res.send(ResponseHelper.generateResponse(400, "Missing query id"));
    }

    const user = await User.findByPk(user_id, {
      attributes: ["id", "first_name", "last_name", "email", "avatar_url"],
    });

    if (!user) {
      return res.send(ResponseHelper.generateNotFoundResponse("User"));
    }

    const followers = await User_follow.findAll({
      where: { user_id, is_followed: true },
      include: {
        model: User,
        as: "Follower",
        attributes: ["id", "first_name", "last_name", "email", "avatar_url"],
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
        attributes: ["id", "first_name", "last_name", "email", "avatar_url"],
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
