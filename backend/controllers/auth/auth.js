const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ResponseHelper = require("../../helpers/response");

const { User } = require("../../models");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.send(
        ResponseHelper.generateResponse(401, "Email or password is incorrect.")
      );
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.send(
        ResponseHelper.generateResponse(401, "Email or Password is incorrect.")
      );
    }

    const token = jwt.sign(
      { id: user.id, type: user.user_type },
      process.env.JWT_SECRET,
      {
        expiresIn: 28800,
      }
    );

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        token: `Bearer ${token}`,
        user: ResponseHelper.removePassword(user),
      })
    );
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
