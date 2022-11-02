const request = require("supertest");

const app = require("../../../app");

describe("POST /signup", () => {
  it("should be able to create an account", async () => {
    const res = await request(app).post("/signup").send({
      first_name: "Billy",
      last_name: "Boy",
      email: "bill123@gmail.com",
      password: "pass",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(200);
  });

  it("should not create an account if email is invalid", async () => {
    const res = await request(app).post("/signup").send({
      first_name: "Invalid",
      last_name: "Email",
      email: "invalid_email",
      password: "inv",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Invalid email address");
  });

  it("should not create an account if email is already in use", async () => {
    const res = await request(app).post("/signup").send({
      first_name: "Bill",
      last_name: "Russell",
      email: "bill123@gmail.com",
      password: "test",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Email is already in use");
  });

  it("should not create an account if first_name is empty", async () => {
    const res = await request(app).post("/signup").send({
      first_name: "",
      last_name: "last",
      email: "email@test.com",
      password: "pass",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Some fields are empty");
  });

  it("should not create an account if last_name is empty", async () => {
    const res = await request(app).post("/signup").send({
      first_name: "first",
      last_name: "",
      email: "email@test.com",
      password: "pass",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Some fields are empty");
  });

  it("should not create an account if email is empty", async () => {
    const res = await request(app).post("/signup").send({
      first_name: "first",
      last_name: "last",
      email: "",
      password: "pass",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Some fields are empty");
  });

  it("should not create an account if password is empty", async () => {
    const res = await request(app).post("/signup").send({
      first_name: "first",
      last_name: "last",
      email: "email@test.com",
      password: "",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Some fields are empty");
  });
});
