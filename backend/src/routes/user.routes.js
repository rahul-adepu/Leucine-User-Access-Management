const express = require("express");

const userRouter = express.Router();

const { registerUser, loginUser } = require("../controllers/user.controller");

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
