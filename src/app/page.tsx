import UserCard from "@/components/UserCard";
import { baseUrl } from "@/utils/config";
import Link from "next/link";

export type UserData = {
  id: number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  createdAt: string;
};

const getUsers = async () => {
  const res = await fetch(`${baseUrl}/api/user`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

export default async function Home() {
  const data: { users: UserData[] } = await getUsers();
  return (
    <main className="flex flex-col items-center justify-between p-12">
      <h1 className="text-2xl font-bold">Users List</h1>
      <Link
        href={"/add-user"}
        className="bg-blue-600 text-white my-4 px-4 py-2 rounded disabled:opacity-50"
      >
        Add new User
      </Link>
      <div className="w-full max-w-2xl mt-4">
        <ul className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {data &&
            data.users.map((user) => <UserCard user={user} key={user.id} />)}
        </ul>
      </div>
    </main>
  );
}
