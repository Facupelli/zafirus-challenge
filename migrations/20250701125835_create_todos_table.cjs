exports.up = async function (knex) {
  await knex.raw(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'todo_status') THEN
        CREATE TYPE todo_status AS ENUM ('pending', 'in_progress', 'completed');
      END IF;
    END
    $$;
  `);

  return knex.schema.createTable("todos", (table) => {
    table.increments("id").primary();
    table.string("title", 100).notNullable();
    table.text("description");
    table.timestamp("limit_date", { useTz: true });
    table.specificType("status", "todo_status").defaultTo("pending");
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.index("user_id", "idx_todos_user_id");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("todos");

  await knex.raw("DROP TYPE IF EXISTS todo_status;");
};
