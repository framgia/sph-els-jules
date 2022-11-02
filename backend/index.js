const db = require("./models");
const app = require("./app");

db.sequelize
  .authenticate()
  .then(() => {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  })
  .catch((error) => {
    console.log("Cannot connect to the database!");
  });
