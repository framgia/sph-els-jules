const httpMocks = require("node-mocks-http");

const adminsController = require("../../../controllers/admin/admins");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("GET /admins", () => {
  it("should fetch all admins", async () => {
    await adminsController.getAdmins(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
  });
});
