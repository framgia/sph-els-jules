const httpMocks = require("node-mocks-http");

const { User } = require("../../models");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("User.validateUser()", () => {
  it("should be able to validate user", async () => {
    const id = 3;
    const email = "janedough@gmail.com";
    const current_password = "test";

    await User.validateUser(id, email, current_password, res);
    expect(res._getData()).toBeFalsy();
  });

  it("should error if user is not found", async () => {
    const id = 17;

    await User.validateUser(id, null, null, res);
    expect(res._getStatusCode()).toEqual(200);
    expect(res._getData().meta.code).toEqual(404);
  });

  it("should error if email already exists", async () => {
    const id = 1;
    const email = "jane123@gmail.com";

    await User.validateUser(id, email, null, res);
    expect(res._getStatusCode()).toEqual(200);
    expect(res._getData().meta.code).toEqual(403);
  });

  it("should error if password is incorrect", async () => {
    const id = 1;
    const email = "johndoe@gmail.com";
    const current_password = "wrong_password";

    await User.validateUser(id, null, current_password, res);
    expect(res._getStatusCode()).toEqual(200);
    expect(res._getData().meta.code).toEqual(401);
  });
});
