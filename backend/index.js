const express = require("express");
const dotenv = require("dotenv");
const AppDataSource = require("./src/config/db");
const usersRoute = require("./src/routes/user.routes");
const authMiddleware = require("./src/middlewares/authMiddleware");
const roleMiddleware = require("./src/middlewares/roleMiddleware");
const softwareRoute = require("./src/routes/software.routes");
const requestRouter = require("./src/routes/request.routes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("User Access Management API is running 🚀");
});

app.use("/api/auth", usersRoute);
app.use(
  "/api/software",
  authMiddleware,
  roleMiddleware("Admin"),
  softwareRoute
);

app.use("/api/requests", requestRouter);

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
