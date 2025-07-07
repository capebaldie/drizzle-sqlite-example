import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function GET() {
  try {
    // Fetch all users from the database
    const users = await db.select().from(usersTable).all();

    console.log("Fetched users:", users);

    // Return the list of users as a JSON response
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
