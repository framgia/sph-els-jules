const httpMocks = require("node-mocks-http");

const adminsController = require("../../../controllers/admin/admins");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("When calling getAdmins function", () => {
  describe("When fetching admins is successfully", () => {
    beforeEach(async () => {
      await adminsController.getAdmins(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(Array.isArray(res._getData().data.admins)).toBeTruthy();
      res._getData().data.admins.forEach((admin) => {
        expect(admin).toMatchObject({
          id: expect.any(Number),
          first_name: expect.any(String),
          last_name: expect.any(String),
          email: expect.any(String),
          user_type: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
  });
});
