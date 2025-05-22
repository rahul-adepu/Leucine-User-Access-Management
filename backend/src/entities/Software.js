const { EntitySchema } = require("typeorm");

const Software = new EntitySchema({
  name: "Software",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "text",
    },
    accessLevels: {
      type: "simple-array",
    },
  },
});

module.exports = { Software };
