import React from "react";

interface Props {
  onClick: () => void;
}
export default function Search(Props: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        onClick={Props.onClick}
        stroke="white"
        className="size-10 p-2 cursor-pointer rounded-full hover:bg-[#313538] transition-colors duration-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </>
  );
}
