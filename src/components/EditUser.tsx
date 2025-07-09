"use client";
import { UserData } from "@/app/page";
import { baseUrl } from "@/utils/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditUser = ({ user }: { user: UserData }) => {
  const [data, setData] = useState({
    name: user.name,
    age: user.age,
    email: user.email,
    isActive: user.isActive,
  });
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "age") {
      setData((prevData) => ({
        ...prevData,
        [name]: parseInt(value) || 0, // Ensure age is a number
      }));
      return;
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body: UserData = {
      id: user.id,
      name: data.name,
      age: data.age,
      email: data.email,
      isActive: data.isActive,
      createdAt: user.createdAt,
    };

    const res = await fetch(`${baseUrl}/api/user/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resJson = await res.json();

    if (res.ok) {
      setEditUser(false);
      router.refresh();
    } else {
      alert(resJson.error);
    }

    setLoading(false);
  };

  return (
    <div>
      {!editUser ? (
        <div className="p-4 border rounded shadow">
          <div className="flex justify-between gap-2 pb-4">
            <h1 className="text-2xl font-bold">User {user.id}</h1>
            <button
              onClick={() => setEditUser(true)}
              className="bg-red-600 cursor-pointer text-white px-4 py-1 rounded disabled:opacity-50"
            >
              Edit
            </button>
          </div>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Email: {user.email}</p>
          <p>Active: {user.isActive ? "Yes" : "No"}</p>
          {isClient && (
            <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={(e) => onChangeHandler(e)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => onChangeHandler(e)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={data.age}
            onChange={(e) => onChangeHandler(e)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add User"}
            </button>
            <Link
              href={"/"}
              className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Go Back
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;
