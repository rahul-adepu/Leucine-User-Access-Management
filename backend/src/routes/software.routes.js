const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { createSoftware } = require("../controllers/software.controller");

const softwareRoute = express.Router();

softwareRoute.post("/", createSoftware);

module.exports = softwareRoute;
