import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(req.method);
  const userId = Number(params.id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "Client error Invalid ID" },
      { status: 400 }
    );
  }
  try {
    // Delete user with the provided id
    await db.delete(usersTable).where(eq(usersTable.id, userId));
    return NextResponse.json(
      {
        message: `user with id ${userId} successfully deleted`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(req.method);
  const userId = Number(params.id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "Client error Invalid ID" },
      { status: 400 }
    );
  }
  try {
    // GET user with the provided id
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    const user = users[0];
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(req.method);
  const userId = Number(params.id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "Client error Invalid ID" },
      { status: 400 }
    );
  }
  try {
    // UPDATE user with the provided id
    const body = await req.json();
    const { name, age, email, isActive } = body;

    if (!name || !email || !age) {
      return NextResponse.json(
        { error: "Missing name or email" },
        { status: 400 }
      );
    }

    const udatedUsers = await db
      .update(usersTable)
      .set({ name, age, email, isActive })
      .where(eq(usersTable.id, userId))
      .returning();

    const updatedUser = udatedUsers[0];
    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
