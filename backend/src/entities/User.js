const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  columns: {
    id: {
      type: "int",
      primary: "true",
      generated: "true",
    },
    username: {
      type: "varchar",
      unique: "true",
    },
    email: {
      type: "varchar",
      unique: "true",
    },
    password: {
      type: "varchar",
    },
  },
});

module.exports = { User };
