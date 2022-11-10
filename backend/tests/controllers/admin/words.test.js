const httpMocks = require("node-mocks-http");

const { Word } = require("../../../models");

const wordsController = require("../../../controllers/admin/words");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("When calling getWordsByLessonId function", () => {
  describe("When fetching words is successful", () => {
    beforeEach(async () => {
      req.query.lesson_id = 2;
      await wordsController.getWordsByLessonId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(Array.isArray(res._getData().data.words)).toBeTruthy();
      res._getData().data.words.forEach((word) => {
        expect(word.dataValues).toMatchObject({
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

  describe("When the lesson is not found", () => {
    beforeEach(async () => {
      req.query.id = 17;
      await wordsController.getWordsByLessonId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling getWordById function", () => {
  describe("When fetching a word is successful", () => {
    beforeEach(async () => {
      req.query.id = 10;
      await wordsController.getWordById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(res._getData().data.word).toMatchObject({
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

  describe("When the word is not found", () => {
    beforeEach(async () => {
      req.query.id = 45;
      await wordsController.getWordById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling createWordByLessonId function", () => {
  describe("When creating a word is successful", () => {
    let data;
    beforeAll(async () => {
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
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(data.data.word).toMatchObject({
        id: expect.any(Number),
        question: expect.any(String),
        correct_answer: expect.any(String),
        choice1: expect.any(String),
        choice2: expect.any(String),
        choice3: expect.any(String),
        choice4: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should be inserted to the database", async () => {
      const word = await Word.findByPk(data.data.word.id);
      expect(word).not.toBeNull();
    });
  });

  describe("When the lesson is not found", () => {
    beforeEach(async () => {
      req.query.lesson_id = 45;
      req.body = {
        question: "Test",
        correct_answer: "Check",
        choice1: "Wrong",
        choice2: "Incorrect",
        choice3: "Check",
        choice4: "Invalid",
      };
      await wordsController.createWordByLessonId(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling updateWordById function", () => {
  describe("When updating a word is successful", () => {
    let data;
    beforeAll(async () => {
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
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(data.data.word).toMatchObject({
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

  describe("When the word is not found", () => {
    beforeEach(async () => {
      req.query.id = 45;
      await wordsController.updateWordById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling deleteWordById function", () => {
  describe("When deleting a word is successful", () => {
    let data;
    beforeAll(async () => {
      req.query.id = 7;
      await wordsController.deleteWordById(req, res);
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(data.data.word).toMatchObject({
        id: expect.any(Number),
        question: expect.any(String),
        correct_answer: expect.any(String),
        choice1: expect.any(String),
        choice2: expect.any(String),
        choice3: expect.any(String),
        choice4: expect.any(String),
        deleted_at: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should be soft deleted in the database", async () => {
      const word = await Word.findByPk(data.data.word.id);
      expect(word?.deleted_at).not.toBeNull();
    });
  });

  describe("When the word is not found", () => {
    beforeEach(async () => {
      req.query.id = 45;
      await wordsController.deleteWordById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});
