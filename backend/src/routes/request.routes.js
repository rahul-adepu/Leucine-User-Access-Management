const express = require("express");
const {
  createRequest,
  updateRequestStatus,
} = require("../controllers/request.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const requestRouter = express.Router();

requestRouter.post("/", authMiddleware, createRequest);

requestRouter.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("Manager"),
  updateRequestStatus
);
module.exports = requestRouter;
