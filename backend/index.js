const path = require("path");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const db = require("./models");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const wordRoutes = require("./routes/words");

const app = express();
const PORT = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname} - ${uniqueSuffix}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
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
