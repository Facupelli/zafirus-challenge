import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (rows[0]) {
    delete rows[0].password_hash;
  }
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
