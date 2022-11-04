const httpMocks = require("node-mocks-http");

const resultsController = require("../../../controllers/user/results");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("GET /results/lesson", () => {
  it("should fetch the user's result for a quiz", async () => {
    req.currentUserId = 1;
    req.query.lesson_id = 1;
    await resultsController.getResultByLessonId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("results");
  });

  it("should error when lesson is not found", async () => {
    req.currentUserId = 1;
    req.query.lesson_id = 5;
    await resultsController.getResultByLessonId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});

describe("POST /results", () => {
  it("should create a new result", async () => {
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
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("results");
  });
});
