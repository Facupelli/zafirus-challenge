import pool from "../config/db.js";

const createUserTable = async () => {
  const createExtensionTypeQuery = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `;
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  try {
    await pool.query(createExtensionTypeQuery);
    console.log("UUID extension created or already exists.");

    await pool.query(createUsersTableQuery);
    console.log("User table created or already exists.");
  } catch (err) {
    console.log("Error creating User table", err);
  }
};

export default createUserTable;
