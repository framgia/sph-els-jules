const httpMocks = require("node-mocks-http");

const lessonsController = require("../../../controllers/user/lessons");
let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("When calling getLessons function", () => {
  describe("When fetching lessons is successful", () => {
    beforeEach(async () => {
      req.currentUserId = 1;
      await lessonsController.getLessons(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(Array.isArray(res._getData().data.lessons)).toBeTruthy();
      res._getData().data.lessons.forEach((lesson) => {
        expect(lesson).toMatchObject({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          deleted_at: expect.toSatisfy(
            (received) => received === null || expect(received).any(Date)
          ),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          Lesson_words: expect.any(Array),
        });
      });
    });
  });
});
