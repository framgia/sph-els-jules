const httpMocks = require("node-mocks-http");

const wordsController = require("../../../controllers/user/words");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("When calling getWordsLearnedByUserId function", () => {
  describe("When fetching words is successful", () => {
    beforeEach(async () => {
      req.query.user_id = 1;
      await wordsController.getWordsLearnedByUserId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(Array.isArray(res._getData().data.words_learned)).toBeTruthy();
      res._getData().data.words_learned.forEach((word) => {
        expect(word).toMatchObject({
          id: expect.any(Number),
          question: expect.any(String),
          correct_answer: expect.any(String),
          choice1: expect.any(String),
          choice2: expect.any(String),
          choice3: expect.any(String),
          choice4: expect.any(String),
          deleted_at: expect.toSatisfy(
            (received) => received === null || expect(received).any(Date)
          ),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
  });
});
