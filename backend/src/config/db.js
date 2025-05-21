const { DataSource } = require("typeorm");
require("dotenv").config();


// const { User } = require("../entities/User");
// const { Software } = require("../entities/Software");
// const { Request } = require("../entities/Request");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
//   entities: [User, Software, Request],
});

module.exports = AppDataSource;
