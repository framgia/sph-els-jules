require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const db = require("./models");
const fileHelper = require("./helpers/fileHelper");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const wordRoutes = require("./routes/words");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const { storage, fileFilter } = fileHelper;
app.use(multer({ storage, fileFilter }).single("avatar_url"));

app.use(authRoutes);
app.use("/users", usersRoutes);
app.use("/words", wordRoutes);

db.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Cannot connect to the database!");
  });
