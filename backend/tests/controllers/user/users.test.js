const request = require("supertest");

const app = require("../../../app");
const { User_follow } = require("../../../models");

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

describe("GET /users", () => {
  it("should fetch all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", token)
      .expect(200);

    expect(res.body.meta.code).toEqual(200);
  });
});

describe("GET /users/id", () => {
  it("should fetch a single user", async () => {
    const res = await request(app)
      .get("/users/id")
      .set("Authorization", token)
      .query({ id: 1 })
      .expect(200);

    expect(res.body.meta.code).toEqual(200);
    expect(res.body.data.user.id).toEqual(1);
  });

  it("should error when user is not found", async () => {
    const res = await request(app)
      .get("/users/id")
      .set("Authorization", token)
      .query({ id: 17 })
      .expect(200);

    expect(res.body.meta.code).toEqual(404);
  });
});

describe("GET /users/activity-logs", () => {
  it("should get the user feed of the current user", async () => {
    const res = await request(app)
      .get("/users/activity-logs")
      .set("Authorization", token)
      .expect(200);

    expect(res.body.meta.code).toEqual(200);
    expect(res.body.data).toHaveProperty("activity_logs");
  });
});

describe("GET /users/learn-count", () => {
  it("should get the learned lessons and words", async () => {
    const res = await request(app)
      .get("/users/learn-count")
      .set("Authorization", token)
      .query({ user_id: 1 })
      .expect(200);

    expect(res.body.meta.code).toEqual(200);
    expect(res.body.data).toHaveProperty("learnedLessons");
    expect(res.body.data).toHaveProperty("learnedWords");
  });

  it("should error when user is not found", async () => {
    const res = await request(app)
      .get("/users/learn-count")
      .set("Authorization", token)
      .query({ user_id: 17 })
      .expect(200);

    expect(res.body.meta.code).toEqual(404);
  });
});

describe("GET /users/profile", () => {
  it("should get the learned lessons and words", async () => {
    const res = await request(app)
      .get("/users/profile")
      .set("Authorization", token)
      .query({ user_id: 1 })
      .expect(200);

    expect(res.body.meta.code).toEqual(200);
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data).toHaveProperty("followers");
    expect(res.body.data).toHaveProperty("following");
    expect(res.body.data).toHaveProperty("activity_logs");
  });

  it("should error when user is not found", async () => {
    const res = await request(app)
      .get("/users/learn-count")
      .set("Authorization", token)
      .query({ user_id: 17 })
      .expect(200);

    expect(res.body.meta.code).toEqual(404);
  });
});

describe("POST /users/toggle-follow", () => {
  it("should follow a user", async () => {
    const res = await request(app)
      .post("/users/toggle-follow")
      .set("Authorization", token)
      .send({ following_id: 4 })
      .expect(200);

    expect(res.body.meta.code).toEqual(200);

    const userFollow = await User_follow.findByPk(res.body.data.user_follow.id);
    expect(userFollow.is_followed).toEqual(true);
  });

  it("should unfollow a user", async () => {
    const res = await request(app)
      .post("/users/toggle-follow")
      .set("Authorization", token)
      .send({ following_id: 4 })
      .expect(200);

    expect(res.body.meta.code).toEqual(200);

    const userFollow = await User_follow.findByPk(res.body.data.user_follow.id);
    expect(userFollow.is_followed).toEqual(false);
  });

  it("should error when user is not found", async () => {
    const res = await request(app)
      .post("/users/toggle-follow")
      .set("Authorization", token)
      .send({ following_id: 17 })
      .expect(200);

    expect(res.body.meta.code).toEqual(404);
  });
});
