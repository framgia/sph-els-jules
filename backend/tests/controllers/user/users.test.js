const httpMocks = require("node-mocks-http");

const { User_follow } = require("../../../models");

const usersController = require("../../../controllers/user/users");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("When calling getUsers function", () => {
  describe("When fetching users is successful", () => {
    beforeEach(async () => {
      await usersController.getUsers(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(Array.isArray(res._getData().data.users)).toBeTruthy();
      res._getData().data.users.forEach((user) => {
        expect(user).toMatchObject({
          id: expect.any(Number),
          first_name: expect.any(String),
          last_name: expect.any(String),
          email: expect.any(String),
          user_type: "user",
          avatar_url: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
  });
});

describe("When calling getUserById function", () => {
  describe("When fetching a user is successful", () => {
    beforeEach(async () => {
      req.query = { id: 1 };
      await usersController.getUserById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(res._getData().data.user).toMatchObject({
        id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        user_type: "user",
        avatar_url: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe("When user is not found", () => {
    beforeEach(async () => {
      req.query = { id: 17 };
      await usersController.getUserById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling getUserFeed function", () => {
  describe("When fetching user feed is successful", () => {
    beforeEach(async () => {
      req.currentUserId = 1;
      await usersController.getUserFeed(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(Array.isArray(res._getData().data.activity_logs)).toBeTruthy();
      res._getData().data.activity_logs.forEach((activity_log) => {
        expect(activity_log).toMatchObject({
          id: expect.any(Number),
          user_id: expect.any(Number),
          relatable_id: expect.any(Number),
          relatable_type: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
  });
});

describe("When calling getLearningsCountByUserId function", () => {
  describe("When fetching learnings is successful", () => {
    beforeEach(async () => {
      req.query = { user_id: 1 };
      await usersController.getLearningsCountByUserId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(res._getData().data).toMatchObject({
        learnedLessons: expect.any(Number),
        learnedWords: expect.any(Number),
      });
    });
  });

  describe("When user is not found", () => {
    beforeEach(async () => {
      req.query = { user_id: 17 };
      await usersController.getLearningsCountByUserId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling getUserProfileByUserId function", () => {
  describe("When fetching user profile is successful", () => {
    beforeEach(async () => {
      req.query = { user_id: 1 };
      await usersController.getUserProfileByUserId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(res._getData().data).toMatchObject({
        user: expect.any(Object),
        followers: expect.any(Array),
        following: expect.any(Array),
        activity_logs: expect.any(Array),
      });
    });
  });

  describe("When user is not found", () => {
    beforeEach(async () => {
      req.query = { user_id: 17 };
      await usersController.getUserProfileByUserId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling toggleFollow function", () => {
  describe("When following a user is successful", () => {
    let data;
    beforeAll(async () => {
      req.currentUserId = 1;
      req.body = { following_id: 4 };
      await usersController.toggleFollow(req, res);
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should update in the database", async () => {
      const userFollow = await User_follow.findByPk(data.data.user_follow.id);
      expect(userFollow.is_followed).toEqual(true);
    });
  });

  describe("When unfollowing a user is successful", () => {
    let data;
    beforeAll(async () => {
      req.currentUserId = 1;
      req.body = { following_id: 4 };
      await usersController.toggleFollow(req, res);
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should update in the database", async () => {
      const userFollow = await User_follow.findByPk(data.data.user_follow.id);
      expect(userFollow.is_followed).toEqual(false);
    });
  });

  describe("When user is not found", () => {
    beforeEach(async () => {
      req.body = { following_id: 17 };
      await usersController.toggleFollow(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});
