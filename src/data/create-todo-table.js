import pool from "../config/db.js";

const createTodoTable = async () => {
  const createEnumTypeQuery = `
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
          FROM pg_type
         WHERE typname = 'todo_status'
      ) THEN
        CREATE TYPE todo_status AS ENUM
          ('pending', 'in_progress', 'completed');
      END IF;
    END
    $$;
  `;
  const createTodosTableQuery = `
   CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    limit_date TIMESTAMPTZ,
    status todo_status DEFAULT 'pending', 
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
   );  
  `;
  const createTodosIndexQuery = `
   CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);
  `;

  try {
    await pool.query(createEnumTypeQuery);
    console.log("Enum type 'todo_status' created or already exists.");

    await pool.query(createTodosTableQuery);
    console.log("Todo table created or already exists.");

    await pool.query(createTodosIndexQuery);
    console.log("Todos index created or already exists");
  } catch (err) {
    console.log("Error creating Todo table", err);
  }
};

export default createTodoTable;
