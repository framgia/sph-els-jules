const httpMocks = require("node-mocks-http");

const { Lesson } = require("../../../models");

const lessonsController = require("../../../controllers/admin/lessons");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("When calling getLessons function", () => {
  describe("When fetching lessons is successful", () => {
    beforeEach(async () => {
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
        expect(lesson.dataValues).toMatchObject({
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

describe("When calling getLessonById function", () => {
  describe("When fetching a lesson is successful", () => {
    beforeEach(async () => {
      req.query.id = 1;
      await lessonsController.getLessonById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(res._getData().meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(res._getData().data.lesson).toMatchObject({
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

  describe("When fetching a lesson that does not exist", () => {
    beforeEach(async () => {
      req.query.id = 17;
      await lessonsController.getLessonById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling createLesson function", () => {
  describe("When creating a lesson is successful", () => {
    let data;
    beforeAll(async () => {
      req.body = { title: "Basic 100", description: "Lorem Ipsum" };
      await lessonsController.createLesson(req, res);
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(data.data.lesson).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should be inserted to the database", async () => {
      const lesson = await Lesson.findByPk(data.data.lesson.id);
      expect(lesson).not.toBeNull();
    });
  });
});

describe("When calling updateLessonById function", () => {
  describe("When updating a lesson is successful", () => {
    let data;
    beforeEach(async () => {
      req.query.id = 1;
      req.body = { title: "Basic 600", description: "Lorem Ipsum" };
      await lessonsController.updateLessonById(req, res);
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(data.data.lesson).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        deleted_at: expect.toSatisfy(
          (received) => received === null || expect(received).any(Date)
        ),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should be updated in the database", async () => {
      const lesson = await Lesson.findByPk(data.data.lesson.id);
      expect(lesson.title).toEqual("Basic 600");
    });
  });

  describe("When the lesson is not found", () => {
    beforeEach(async () => {
      req.query.id = 17;
      await lessonsController.updateLessonById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});

describe("When calling deleteLessonById function", () => {
  describe("When deleting a lesson is successful", () => {
    let data;
    beforeAll(async () => {
      req.query.id = 1;
      await lessonsController.deleteLessonById(req, res);
      data = res._getData();
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 200", () => {
      expect(data.meta.code).toEqual(200);
    });

    it("should have a correct body structure properties", () => {
      expect(data.data.lesson).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        deleted_at: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should be soft deleted in the database", async () => {
      const lesson = await Lesson.findByPk(data.data.lesson.id);
      expect(lesson?.deleted_at).not.toBeNull();
    });
  });

  describe("When the lesson is not found", () => {
    beforeEach(async () => {
      req.query.id = 17;
      await lessonsController.deleteLessonById(req, res);
    });

    it("should return status of 200", () => {
      expect(res.statusCode).toEqual(200);
    });

    it("should return meta code of 404", () => {
      expect(res._getData().meta.code).toEqual(404);
    });
  });
});
