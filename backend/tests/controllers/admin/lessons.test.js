const httpMocks = require("node-mocks-http");

const { Lesson } = require("../../../models");

const lessonsController = require("../../../controllers/admin/lessons");

let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("GET /admin/lessons", () => {
  it("should fetch all the lessons", async () => {
    await lessonsController.getLessons(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("lessons");
  });
});

describe("GET /admin/lessons/id", () => {
  it("should fetch a lesson by id", async () => {
    req.query.id = 1;
    await lessonsController.getLessonById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("lesson");
  });

  it("should error when lesson is not found", async () => {
    req.query.id = 17;
    await lessonsController.getLessonById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});

describe("POST /admin/lessons", () => {
  it("should create a new lesson", async () => {
    req.body = { title: "Basic 100", description: "Lorem Ipsum" };
    await lessonsController.createLesson(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("lesson");

    const lesson = await Lesson.findByPk(data.data.lesson.id);
    expect(lesson).not.toBeNull();
  });
});

describe("PUT /admin/lessons/update/id", () => {
  it("should update an existing lesson", async () => {
    req.query.id = 1;
    req.body = { title: "Basic 600", description: "Lorem Ipsum" };
    await lessonsController.updateLessonById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("lesson");

    const lesson = await Lesson.findByPk(data.data.lesson.id);
    expect(lesson.title).toEqual("Basic 600");
  });

  it("should error when lesson is not found", async () => {
    req.query.id = 17;
    req.body = { title: "On Vacation", description: "Lorem Ipsum" };
    await lessonsController.updateLessonById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});

describe("DELETE /admin/lessons/delete/id", () => {
  it("should update an existing lesson", async () => {
    req.query.id = 1;
    await lessonsController.deleteLessonById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(200);
    expect(data.data).toHaveProperty("lesson");

    const lesson = await Lesson.findByPk(data.data.lesson.id);
    expect(lesson?.deleted_at).not.toBeNull();
  });

  it("should error when lesson is not found", async () => {
    req.query.id = 17;
    await lessonsController.deleteLessonById(req, res);
    const data = res._getData();

    expect(res._getStatusCode()).toEqual(200);
    expect(data.meta.code).toEqual(404);
  });
});
