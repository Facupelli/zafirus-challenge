require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
    },
    migrations: {
      directory: "./migrations", // Path to migrations folder
    },
    seeds: {
      directory: "./seeds", // Path to seeds folder (optional)
    },
  },
};
