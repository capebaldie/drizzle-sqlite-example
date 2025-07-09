import { UserData } from "@/app/page";
import EditUser from "@/components/EditUser";
import { baseUrl } from "@/utils/config";
import React from "react";

export async function generateStaticParams() {
  const data: { users: UserData[] } = await fetch(`${baseUrl}/api/user`).then(
    (res) => res.json()
  );

  return data.users.map((user) => ({
    id: user.id.toString(),
  }));
}

const getUser = async (id: number) => {
  const res = await fetch(`${baseUrl}/api/user/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const response = await res.json();
  return response.user;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user: UserData = await getUser(Number(id));
  return (
    <main className="flex flex-col items-center justify-between p-12">
      <EditUser user={user} />
    </main>
  );
}
