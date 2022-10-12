const bcrypt = require("bcrypt");

const ResponseHelper = require("../../helpers/response");

const { User } = require("../../models");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.send(
        ResponseHelper.generateResponse(401, "Email or password is incorrect.")
      );
      return;
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      res.send(
        ResponseHelper.generateResponse(401, "Email or Password is incorrect.")
      );
      return;
    }
    res.send(ResponseHelper.generateResponse(200, "Success", { user }));
  },
  signup: async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.send(
        ResponseHelper.generateResponse(401, "Email is already in use.")
      );
      return;
    }

    const salt = 11;
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hash,
      user_type: "user",
      avatar_url: `${process.env.BACKEND_URL}/images/default_img.jpeg`,
    });

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );
  },
};
