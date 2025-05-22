const express = require("express");

const userRouter = express.Router();

const { registerUser, loginUser } = require("../controllers/user.controller");
const { getAllSoftwares } = require("../controllers/software.controller");

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getSoftwares", getAllSoftwares);

module.exports = userRouter;
