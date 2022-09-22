require("dotenv").config();

const { DATABASE_USER, DATABASE_PASS, DATABASE } = process.env;

module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
