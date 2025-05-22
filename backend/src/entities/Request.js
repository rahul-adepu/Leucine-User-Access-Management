// src/entities/Request.js
const { EntitySchema } = require("typeorm");

const Request = new EntitySchema({
  name: "Request",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    status: {
      type: "enum",
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reason: {
      type: "text",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      eager: true,
    },
    software: {
      type: "many-to-one",
      target: "Software",
      eager: true,
    },
  },
});

module.exports = { Request };
