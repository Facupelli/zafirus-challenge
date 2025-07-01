import pool from "../config/db.js";
import { NotFoundError } from "../utils/error.utils.js";

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};

export const findUserById = async (id) => {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );

  if (rowCount === 0) {
    throw new NotFoundError("User not found");
  }

  delete rows[0].password_hash;
  return rows[0];
};

export const createUser = async (email, passwordHash) => {
  const { rows } = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at",
    [email, passwordHash]
  );
  return rows[0];
};

export const sanitizeUser = (user) => {
  const sanitized = { ...user };
  delete sanitized.password_hash;
  return sanitized;
};
