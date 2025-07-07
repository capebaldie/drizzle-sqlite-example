"use client";

import Link from "next/link";
import { useState } from "react";

type UserData = {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  createdAt: string;
};

export default function AddUserPage() {
  const [data, setData] = useState({
    name: "",
    age: 0,
    email: "",
    isActive: true,
    createdAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const body: UserData = {
      name: data.name,
      age: data.age,
      email: data.email,
      isActive: data.isActive,
      createdAt: data.createdAt,
    };

    const res = await fetch("/api/user/add", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resJson = await res.json();
    if (res.ok) {
      setMessage("User added!");
      setData({
        name: "",
        age: 0,
        email: "",
        isActive: true,
        createdAt: new Date().toISOString(),
      });
    } else {
      setMessage(resJson.error || "Something went wrong.");
    }

    setLoading(false);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

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

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
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
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
