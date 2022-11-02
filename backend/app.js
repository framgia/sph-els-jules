require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const logger = require("morgan");

const fileHelper = require("./helpers/file");
const authRoutes = require("./routes/auth/auth");
const usersRoutes = require("./routes/user/users");
const lessonRoutes = require("./routes/user/lessons");
const wordRoutes = require("./routes/user/words");
const resultsRoutes = require("./routes/user/results");
const adminRoutes = require("./routes/admin/admins");
const adminLessonRoutes = require("./routes/admin/lessons");
const adminWordRoutes = require("./routes/admin/words");

const app = express();

app.use(cors());
app.use(logger("dev"));
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
app.use("/admins", adminRoutes);
app.use("/admin/lessons", adminLessonRoutes);
app.use("/admin/words", adminWordRoutes);

module.exports = app;
