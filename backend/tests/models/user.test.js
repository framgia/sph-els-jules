const httpMocks = require("node-mocks-http");

const { User } = require("../../models");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("When calling validateUser function", () => {
  describe("When validation is successful", () => {
    beforeEach(async () => {
      const id = 3;
      const email = "janedough@gmail.com";
      const current_password = "test";

      await User.validateUser(id, email, current_password, res);
    });

    it("should not return an error response", async () => {
      expect(res._getData()).toBeFalsy();
    });
  });

  describe("When user is not found", () => {
    beforeEach(async () => {
      const id = 17;

      await User.validateUser(id, null, null, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });

  describe("When email already exists", () => {
    beforeEach(async () => {
      const id = 1;
      const email = "jane123@gmail.com";

      await User.validateUser(id, email, null, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 403", () => {
      expect(res._getData().meta.code).toEqual(403);
    });
  });

  describe("When password is incorrect", () => {
    beforeEach(async () => {
      const id = 1;
      const email = "johndoe@gmail.com";
      const current_password = "wrong_password";

      await User.validateUser(id, null, current_password, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 401", () => {
      expect(res._getData().meta.code).toEqual(401);
    });
  });
});
