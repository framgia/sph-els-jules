const httpMocks = require("node-mocks-http");

const lessonsController = require("../../../controllers/user/lessons");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("GET /lessons", () => {
  it("should fetch all the lessons and corresponding scores of the user", async () => {
    req.currentUserId = 1;
    await lessonsController.getLessons(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("lessons");
  });
});
