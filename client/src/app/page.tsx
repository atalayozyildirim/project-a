"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState({ email: "", password: "" });

  const { login, isLoaded } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-96 p-4    shadow-md rounded">
        <h2 className="text-left text-2xl mb-4">Welcome back {":)"}</h2>
        <input
          type="text"
          placeholder="Email"
          className="mb-3 p-2 border-0 rounded-lg bg-[#1c1c1e] focus:outline-0"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: (e.target as HTMLInputElement).value })
          }
          className="mb-3 p-2 border-0  bg-[#1c1c1e] rounded-lg focus:outline-0"
        />
        <button
          type="submit"
          onClick={() => login(data.email, data.password)}
          {...(isLoaded ? { disabled: true } : {})}
          className="p-2 bg-amber-400 text-white rounded-3xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}
