require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const db = require("./models");
const fileHelper = require("./helpers/fileHelper");
const authRoutes = require("./routes/auth/auth");
const usersRoutes = require("./routes/user/users");
const lessonRoutes = require("./routes/user/lessons");
const wordRoutes = require("./routes/user/words");
const resultsRoutes = require("./routes/user/results");
const adminLessonRoutes = require("./routes/admin/lessons");

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
app.use("/lessons", lessonRoutes);
app.use("/words", wordRoutes);
app.use("/results", resultsRoutes);
app.use("/admin/lessons", adminLessonRoutes);

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
