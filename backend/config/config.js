require("dotenv").config();

const { DATABASE_USER, DATABASE_PASS, DATABASE_HOST, DATABASE } = process.env;

module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE,
    host: DATABASE_HOST,
    dialect: "mysql",
  },
  test: {
    username: DATABASE_USER,
    password: DATABASE_PASS,
    database: "els-test",
    host: DATABASE_HOST,
    dialect: "mysql",
  },
  production: {
    username: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE,
    host: DATABASE_HOST,
    dialect: "mysql",
  },
};
