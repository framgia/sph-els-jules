const appRoot = require("app-root-path");
const bcrypt = require("bcrypt");
const request = require("supertest");

const app = require("../../../app");
const { User } = require("../../../models");

let token;
test("login and authorize", async () => {
  const res = await request(app)
    .post("/login")
    //! If `profile.test.js` was ran before
    //! use this - { email: "johndoe123@gmail.com", password: "pass123" }
    .send({ email: "johndoe@gmail.com", password: "pass" })
    .expect(200);

  expect(res.body.meta.code).toEqual(200);
  expect(res.body.data).toHaveProperty("token");

  token = res.body.data.token;
});

describe("PUT /users/profile", () => {
  it("should update the first name, last name, and email", async () => {
    const res = await request(app)
      .put("/users/profile")
      .set("Authorization", token)
      .send({
        user_id: 1,
        first_name: "John123",
        last_name: "Doe123",
        email: "johndoe123@gmail.com",
      })
      .expect(200);
    expect(res.body.meta.code).toEqual(200);
    expect(res.body.data).toHaveProperty("user");

    const user = await User.findByPk(1);
    expect(user.first_name).toEqual("John123");
    expect(user.last_name).toEqual("Doe123");
    expect(user.email).toEqual("johndoe123@gmail.com");
  });

  it("should update the password", async () => {
    const res = await request(app)
      .put("/users/profile")
      .set("Authorization", token)
      .send({
        user_id: 1,
        current_password: "pass",
        new_password: "pass123",
      })
      .expect(200);
    expect(res.body.meta.code).toEqual(200);
    expect(res.body.data).toHaveProperty("user");

    const user = await User.findByPk(1);
    const compare = await bcrypt.compare("pass123", user.password);
    expect(compare).toEqual(true);
  });

  it("should update the profile image", async () => {
    const res = await request(app)
      .put("/users/profile")
      .set("Authorization", token)
      .field("user_id", 1)
      .attach("avatar_url", `${appRoot}/tests/images/els.png`)
      .expect(200);

    expect(res.body.meta.code).toEqual(200);
    expect(res.body.data).toHaveProperty("user");

    const user = await User.findByPk(1);
    expect(user.avatar_url).toEqual(res.body.data.user.avatar_url);
  });
});
