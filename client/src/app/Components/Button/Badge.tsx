import React from "react";

interface BadgeProps {
  badgeIcon: boolean;
  text: string;
}
export default function Badge(Props: BadgeProps) {
  return (
    <>
      <div className="w-32 h-auto flex justify-center item-center">
        <div className="border cursor-pointer  h-8 gap-2 w-full text-sm border-[#27272a] rounded-3xl flex items-center justify-center">
          {!Props.badgeIcon ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          <span>{Props.text || "2"}</span>
        </div>
      </div>
    </>
  );
}
