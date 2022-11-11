const appRoot = require("app-root-path");
const bcrypt = require("bcrypt");
const httpMocks = require("node-mocks-http");
const request = require("supertest");

const app = require("../../../app");
const { User } = require("../../../models");

const usersController = require("../../../controllers/user/users");

let req;
let res;
let token;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

test("login and authorize", async () => {
  const res = await request(app)
    .post("/login")
    .send({ email: "johndoe@gmail.com", password: "pass" })
    .expect(200);

  expect(res.body.meta.code).toEqual(200);
  expect(res.body.data).toHaveProperty("token");

  token = res.body.data.token;
});

describe("When calling updateProfileById function", () => {
  describe("When updating user details is successful", () => {
    let data;
    beforeAll(async () => {
      req.body = {
        user_id: 1,
        first_name: "John123",
        last_name: "Doe123",
        email: "johndoe123@gmail.com",
      };
      await usersController.updateProfileById(req, res);
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(data.data.user).toMatchObject({
        id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        avatar_url: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should be updated in the database", async () => {
      const user = await User.findByPk(1);
      expect(user).toMatchObject({
        first_name: "John123",
        last_name: "Doe123",
        email: "johndoe123@gmail.com",
      });
    });
  });

  describe("When updating password is successful", () => {
    let data;
    beforeAll(async () => {
      req.body = {
        user_id: 1,
        current_password: "pass",
        new_password: "pass123",
      };
      await usersController.updateProfileById(req, res);
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(data.data.user).toMatchObject({
        id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        avatar_url: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should be updated in the database", async () => {
      const user = await User.findByPk(1);
      const compare = await bcrypt.compare("pass123", user.password);
      expect(compare).toEqual(true);
    });
  });

  describe("When updating profile image is successful", () => {
    let res;
    beforeAll(async () => {
      res = await request(app)
        .put("/users/profile")
        .set("Authorization", token)
        .field("user_id", 1)
        .attach("avatar_url", `${appRoot}/tests/images/els.png`)
        .expect(200);
    });

    it("should return meta code of 200", () => {
      expect(res.body.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(res.body.data.user).toMatchObject({
        id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        avatar_url: expect.any(String),
      });
    });
  });
});
