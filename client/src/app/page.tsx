import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-96 p-4    shadow-md rounded">
        <h2 className="text-left text-2xl mb-4">Welcome back :) </h2>
        <input
          type="text"
          placeholder="Email"
          className="mb-3 p-2 border-0 rounded-lg bg-[#1c1c1e] focus:outline-0"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-3 p-2 border-0  bg-[#1c1c1e] rounded-lg focus:outline-0"
        />
        <button
          type="submit"
          className="p-2 bg-amber-400 text-white rounded-3xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}
