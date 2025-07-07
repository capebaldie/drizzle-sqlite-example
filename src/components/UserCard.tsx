"use client";
import { UserData } from "@/app/page";
import { baseUrl } from "@/utils/config";
import React from "react";

const UserCard = ({ user }: { user: UserData }) => {
  const deleteUser = async (userId: number) => {
    const res = await fetch(`${baseUrl}/api/user/${userId}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (res.ok) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  };

  return (
    <li className="p-4 border rounded shadow">
      <div className="flex items-center justify-between pb-2">
        <p className="font-bold text-lg">User {user.id}</p>
        <button
          onClick={() => {
            deleteUser(user.id);
          }}
          className="bg-red-600 cursor-pointer text-white px-4 py-1 rounded disabled:opacity-50"
        >
          Delete
        </button>
      </div>
      <div className="text-gray-400">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
        <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
      </div>
    </li>
  );
};

export default UserCard;
