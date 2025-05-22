const express = require("express");
const {
  createRequest,
  getAllRequests,
  updateRequestStatus,
} = require("../controllers/request.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const requestRouter = express.Router();

requestRouter.post("/", authMiddleware, createRequest);
requestRouter.get(
  "/getAllRequests",
  authMiddleware,
  roleMiddleware("Manager", "Admin"),
  getAllRequests
);
requestRouter.patch(
  "/:requestId",
  authMiddleware,
  roleMiddleware("Manager"),
  updateRequestStatus
);

module.exports = requestRouter;
