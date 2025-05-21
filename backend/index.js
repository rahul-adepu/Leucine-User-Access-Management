const express = require("express");
const dotenv = require("dotenv");
const AppDataSource = require("./src/config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("User Access Management API is running 🚀");
});

const usersRoute = require("./src/routes/user.routes");
app.use("/api/users", usersRoute);

AppDataSource.initialize()
  .then(() => {
    console.log("PostgreSQL connected successfully using TypeORM");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during DB connection:", error);
  });
