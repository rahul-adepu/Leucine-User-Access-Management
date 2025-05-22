const express = require("express");
const {
  createRequest,
  getAllRequests,
} = require("../controllers/request.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const requestRouter = express.Router();

requestRouter.post("/", authMiddleware, createRequest);
requestRouter.get(
  "/All",
  authMiddleware,
  roleMiddleware("Manager", "Admin"),
  getAllRequests
);
module.exports = requestRouter;
