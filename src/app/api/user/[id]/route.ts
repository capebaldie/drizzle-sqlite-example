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
