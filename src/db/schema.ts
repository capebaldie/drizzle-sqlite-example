import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Define the schema for the users table using Drizzle ORM
// This schema defines the structure of the users table in the SQLite database
// It includes fields for id, name, age, email, isActive, and createdAt
// Each field has its type and constraints defined, such as primary key, not null, unique
// and default values.
// The id field is an auto-incrementing primary key, name is a non-null text field,
// age is a non-null integer, email is a non-null unique text field, isActive
export const usersTable = sqliteTable("users_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  age: int("age").notNull(),
  email: text("email").notNull().unique(),
  isActive: int("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), // Default value for createdAt is set to the current timestamp
});
