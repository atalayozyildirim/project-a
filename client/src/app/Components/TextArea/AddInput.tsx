import React from "react";

export default function AddInput() {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Command !help"
          className=" top-0 left-1/2 text-white  transform -translate-x-1/2 w-1/2 z-10 bg-[#141517] shadow-lg h-14 p-1 mt-2 rounded-3xl flex justify-between items-center"
        />
      </div>
    </>
  );
}
