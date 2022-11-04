const httpMocks = require("node-mocks-http");

const { Word } = require("../../../models");

const wordsController = require("../../../controllers/admin/words");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("GET /admin/words", () => {
  it("should fetch all the words of a lesson", async () => {
    req.query.lesson_id = 2;
    await wordsController.getWordsByLessonId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("words");
  });

  it("should error when lesson is not found", async () => {
    req.query.lesson_id = 17;
    await wordsController.getWordsByLessonId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});

describe("GET /admin/words/id", () => {
  it("should fetch a word by id", async () => {
    req.query.id = 10;
    await wordsController.getWordById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("word");
  });

  it("should error when word is not found", async () => {
    req.query.id = 45;
    await wordsController.getWordById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});

describe("POST /admin/lessons", () => {
  it("should create a new lesson", async () => {
    req.body = { title: "Basic 100", description: "Lorem Ipsum" };
    req.query.lesson_id = 2;
    req.body = {
      question: "Test",
      correct_answer: "Check",
      choice1: "Wrong",
      choice2: "Incorrect",
      choice3: "Check",
      choice4: "Invalid",
    };
    await wordsController.createWordByLessonId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("word");

    const word = await Word.findByPk(data.data.word.id);
    expect(word).not.toBeNull();
  });

  it("should error when lesson is not found", async () => {
    req.query.lesson_id = 17;
    req.body = {
      question: "Test",
      correct_answer: "Check",
      choice1: "Wrong",
      choice2: "Incorrect",
      choice3: "Check",
      choice4: "Invalid",
    };
    await wordsController.createWordByLessonId(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});

describe("PUT /admin/words/update/id", () => {
  it("should update an existing word", async () => {
    req.query.id = 10;
    req.body = {
      question: "Test123",
      correct_answer: "Chk123",
      choice1: "asd12",
      choice2: "qwe",
      choice3: "zxc12",
      choice4: "Chk123",
    };
    await wordsController.updateWordById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("word");

    const word = await Word.findByPk(data.data.word.id);
    expect(word.question).toEqual("Test123");
  });

  it("should error when word is not found", async () => {
    req.query.id = 45;
    req.body = {
      question: "Test123",
      correct_answer: "Chk123",
      choice1: "asd12",
      choice2: "qwe",
      choice3: "zxc12",
      choice4: "Chk123",
    };
    await wordsController.updateWordById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});

describe("DELETE /admin/word/delete/id", () => {
  it("should update an existing word", async () => {
    req.query.id = 7;
    await wordsController.deleteWordById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("word");

    const word = await Word.findByPk(data.data.word.id);
    expect(word?.deleted_at).not.toBeNull();
  });

  it("should error when word is not found", async () => {
    req.query.id = 45;
    await wordsController.deleteWordById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});
