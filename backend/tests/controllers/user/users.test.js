const httpMocks = require("node-mocks-http");

const { User_follow } = require("../../../models");

const usersController = require("../../../controllers/user/users");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("GET /users", () => {
  it("should fetch all users", async () => {
    await usersController.getUsers(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
  });
});

describe("GET /users/id", () => {
  it("should fetch a single user", async () => {
    req.query = { id: 1 };
    await usersController.getUserById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data.user.id).toEqual(1);
  });

  it("should error when user is not found", async () => {
    req.query = { id: 17 };
    await usersController.getUserById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});

describe("GET /users/activity-logs", () => {
  it("should get the user feed of the current user", async () => {
    req.currentUserId = 1;
    await usersController.getUserFeed(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("activity_logs");
  });
});

describe("GET /users/learn-count", () => {
  it("should get the learned lessons and words", async () => {
    req.query = { user_id: 1 };
    await usersController.getLearningsCountByUserId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("learnedLessons");
    expect(data.data).toHaveProperty("learnedWords");
  });

  it("should error when user is not found", async () => {
    req.query = { user_id: 17 };
    await usersController.getLearningsCountByUserId(req, res);
    const data = res._getData();

    expect(data.meta.code).toEqual(404);
  });
});

describe("GET /users/profile", () => {
  it("should get the learned lessons and words", async () => {
    req.query = { user_id: 1 };
    await usersController.getUserProfileByUserId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("user");
    expect(data.data).toHaveProperty("followers");
    expect(data.data).toHaveProperty("following");
    expect(data.data).toHaveProperty("activity_logs");
  });

  it("should error when user is not found", async () => {
    req.query = { user_id: 17 };
    await usersController.getLearningsCountByUserId(req, res);
    const data = res._getData();

    expect(data.meta.code).toEqual(404);
  });
});

describe("POST /users/toggle-follow", () => {
  it("should follow a user", async () => {
    req.currentUserId = 1;
    req.body = { following_id: 4 };
    await usersController.toggleFollow(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);

    const userFollow = await User_follow.findByPk(data.data.user_follow.id);
    expect(userFollow.is_followed).toEqual(true);
  });

  it("should unfollow a user", async () => {
    req.currentUserId = 1;
    req.body = { following_id: 4 };
    await usersController.toggleFollow(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);

    const userFollow = await User_follow.findByPk(data.data.user_follow.id);
    expect(userFollow.is_followed).toEqual(false);
  });

  it("should error when user is not found", async () => {
    req.query = { user_id: 17 };
    await usersController.getLearningsCountByUserId(req, res);
    const data = res._getData();

    expect(data.meta.code).toEqual(404);
  });
});
