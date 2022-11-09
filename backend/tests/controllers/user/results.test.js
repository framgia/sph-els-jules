const httpMocks = require("node-mocks-http");

const resultsController = require("../../../controllers/user/results");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("When calling getResultByLessonId function", () => {
  describe("When fetching user's quiz results is successful", () => {
    beforeEach(async () => {
      req.currentUserId = 1;
      req.query.lesson_id = 1;
      await resultsController.getResultByLessonId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(Array.isArray(res._getData().data.results)).toBeTruthy();
      res._getData().data.results.forEach((result) => {
        expect(result).toMatchObject({
          id: expect.any(Number),
          user_id: expect.any(Number),
          word_id: expect.any(Number),
          lesson_id: expect.any(Number),
          answer: expect.any(String),
          is_correct: expect.any(Boolean),
          deleted_at: expect.toSatisfy(
            (received) => received === null || expect(received).any(Date)
          ),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          Word: expect.any(Object),
        });
      });
    });
  });

  describe("When lesson is not found", () => {
    beforeEach(async () => {
      req.currentUserId = 1;
      req.query.lesson_id = 5;
      await resultsController.getResultByLessonId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling createResult function", () => {
  describe("When creating result is successful", () => {
    beforeEach(async () => {
      req.currentUserId = 1;
      req.body = {
        0: {
          user_id: 1,
          word_id: 6,
          lesson_id: 2,
          answer: "How much is this?",
          is_correct: false,
        },
        1: {
          user_id: 1,
          word_id: 8,
          lesson_id: 2,
          answer: "Refill, please",
          is_correct: false,
        },
        2: {
          user_id: 1,
          word_id: 10,
          lesson_id: 2,
          answer: "I'd like a large portion",
          is_correct: true,
        },
        3: {
          user_id: 1,
          word_id: 7,
          lesson_id: 2,
          answer: "How much is this?",
          is_correct: false,
        },
        4: {
          user_id: 1,
          word_id: 9,
          lesson_id: 2,
          answer: "Water please",
          is_correct: true,
        },
      };
      await resultsController.createResult(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(Array.isArray(res._getData().data.results)).toBeTruthy();
      res._getData().data.results.forEach((result) => {
        expect(result).toMatchObject({
          id: expect.any(Number),
          user_id: expect.any(Number),
          word_id: expect.any(Number),
          lesson_id: expect.any(Number),
          answer: expect.any(String),
          is_correct: expect.any(Boolean),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
  });
});
