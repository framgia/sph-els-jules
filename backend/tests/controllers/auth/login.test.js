const request = require("supertest");

const app = require("../../../app");
const { User } = require("../../../models");

describe("POST /login", () => {
  it("should be able to login and provide a Bearer token", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoe@gmail.com",
      password: "pass",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(200);
    expect(res.body.data).toHaveProperty("token");
  });

  it("should not login if email is not found", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoe12345@gmail.com",
      password: "pass",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Email or password is incorrect");
  });

  it("should not login if password is incorrect", async () => {
    const res = await request(app).post("/login").send({
      email: "jane123@gmail.com",
      password: "wrong_password",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(401);
    expect(res.body.meta.message).toEqual("Email or password is incorrect");
  });

  it("should not create an account if email is empty", async () => {
    const res = await request(app).post("/login").send({
      email: "",
      password: "pass",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Some fields are empty");
  });

  it("should not create an account if password is empty", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoe@gmail.com",
      password: "",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.meta.code).toEqual(400);
    expect(res.body.meta.message).toEqual("Some fields are empty");
  });
});
