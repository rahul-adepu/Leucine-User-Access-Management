const express = require("express");
const { createRequest } = require("../controllers/request.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const requestRouter = express.Router();

requestRouter.post("/", authMiddleware, createRequest);

module.exports = requestRouter;
