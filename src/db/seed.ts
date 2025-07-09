// src/db/seed.ts
import { db } from "./index";
import { usersTable } from "./schema";
// import { sql } from "drizzle-orm";
import { closeDb } from "./index";

async function seed() {
  try {
    // Optional: Clear existing data
    // db.run(sql`DELETE FROM ${usersTable}`);

    // Dummy users
    const users = [
      {
        name: "Alice",
        age: 25,
        email: "alice@example.com",
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Bob",
        age: 30,
        email: "bob@example.com",
        isActive: false,
        createdAt: new Date().toISOString(),
      },
    ];

    // Insert
    const result = db.insert(usersTable).values(users).returning().all();
    console.log("Seeded users:", result);
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    closeDb();
  }
}

seed();
