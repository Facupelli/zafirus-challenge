import pool from "../config/db.js";
import { NotFoundError } from "../utils/error.utils.js";

export const getAllTodos = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};

export const getTodoById = async (id, userId) => {
  const result = await pool.query(
    "SELECT * FROM todos WHERE id = $1 AND user_id = $2",
    [id, userId]
  );

  if (result.rowCount === 0) {
    throw new NotFoundError("Todo not found");
  }

  return result.rows[0];
};

export const createTodo = async (todo) => {
  const { title, description, limitDate, status, userId } = todo;
  const result = await pool.query(
    `INSERT INTO todos (title, description, limit_date, status, user_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, limitDate, status, userId]
  );
  return result.rows[0];
};

export const updateTodo = async (todo, userId) => {
  const { id, title, description, limitDate, status } = todo;
  const result = await pool.query(
    `UPDATE todos
     SET title=$1, description=$2, limit_date=$3, status=$4
     WHERE id=$5 AND user_id=$6
     RETURNING *`,
    [title, description, limitDate, status, id, userId]
  );
  return result.rows[0];
};

export const deleteTodo = async (id, userId) => {
  const result = await pool.query(
    "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId]
  );

  if (result.rowCount === 0) {
    throw new NotFoundError("Todo not found");
  }

  return result.rows[0];
};
