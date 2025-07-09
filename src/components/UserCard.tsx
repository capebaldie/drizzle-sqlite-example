"use client";
import { UserData } from "@/app/page";
import { baseUrl } from "@/utils/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserCard = ({ user }: { user: UserData }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);
  const deleteUser = async (userId: number) => {
    const res = await fetch(`${baseUrl}/api/user/${userId}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (res.ok) {
      alert(result.message);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  return (
    <li className="p-4 border rounded shadow">
      <div className="flex items-center justify-between pb-2">
        <p className="font-bold text-lg">User {user.id}</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              deleteUser(user.id);
            }}
            className="bg-red-600 cursor-pointer text-white px-4 py-1 rounded disabled:opacity-50"
          >
            Delete
          </button>
          <Link
            href={`/user/${user.id}`}
            className="bg-green-500 cursor-pointer text-white px-4 py-1 rounded disabled:opacity-50"
          >
            View
          </Link>
        </div>
      </div>
      <div className="text-gray-400">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
        {isClient && (
          <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
        )}
      </div>
    </li>
  );
};

export default UserCard;
