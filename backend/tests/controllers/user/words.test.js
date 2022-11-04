const httpMocks = require("node-mocks-http");

const wordsController = require("../../../controllers/user/words");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("GET /words/user", () => {
  it("should fetch all words learned of a user", async () => {
    req.query.user_id = 1;
    await wordsController.getWordsLearnedByUserId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("words_learned");
  });
});
