import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, age, email, isActive, createdAt } = body;

    console.log("Received data:", body);

    if (!name || !email || !age) {
      return NextResponse.json(
        { error: "Missing name or email" },
        { status: 400 }
      );
    }

    const result = db
      .insert(usersTable)
      .values({ name, age, email, isActive, createdAt })
      .returning()
      .get();

    return NextResponse.json({ user: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
