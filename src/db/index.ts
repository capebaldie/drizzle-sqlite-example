import { drizzle } from "drizzle-orm/better-sqlite3";
// import BetterSqlite3 from "better-sqlite3";
// import { usersTable } from "./schema";
import * as schema from "./schema";
import Database from "better-sqlite3";
import path from "path";

// Initialize the SQLite database connection
// Uncomment the following lines if you want to use BetterSqlite3 directly
// can also write the code like this
// const sqlite = BetterSqlite3("sqlite.db");
// export const db = drizzle(sqlite, {
//   schema: {
//     usersTable,
//   },
// });
// Initialize the SQLite database connection
const sqlitePath = path.resolve(process.cwd(), "sqlite.db");
const sqlite = new Database(sqlitePath);
export const db = drizzle(sqlite, { schema });

export function closeDb() {
  sqlite.close();
  console.log("SQLite database connection closed.");
}
