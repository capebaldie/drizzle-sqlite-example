import { drizzle } from "drizzle-orm/better-sqlite3";
// import BetterSqlite3 from "better-sqlite3";
// import { usersTable } from "./schema";
import * as schema from "./schema";
import Database from "better-sqlite3";

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
const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema });
