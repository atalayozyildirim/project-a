import React from "react";
import Image from "next/image";

interface EmailData {
  sender: string;
  subject: string;
  mail: string;
  date: string;
  reply: string;
}

interface EmailCardProps {
  data: EmailData[];
}

export default function EmailDetailCard({ data }: EmailCardProps) {
  return (
    <>
      <div className="border-b border-[#27272a]">
        <div data-button className="w-full h-12 flex items-center gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          <div className="flex justify-end w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </div>
        </div>
      </div>
      {data &&
        data.map((email, index) => (
          <React.Fragment key={index}>
            <div className="w-full h-24 border-b border-[#27272a] p-2">
              <div className="flex gap-5">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://via.placeholder.com/40"
                    alt="Avatar"
                    className="w-9 h-9 rounded-full shadow-md cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-bold">{email.sender}</div>
                  <div className="text-sm">{email.subject}</div>
                  <div className="text-sm">Reply-To : {email.reply}</div>
                </div>
              </div>
            </div>

            <div className="w-full h-96 2xl:h-full md:h-screen bg-transparent mt-10 break-words overflow-y-auto">
              {email.mail}
            </div>

            <div className="w-full h-auto relative -bottom-15 mt-8 border-t border-[#27272a] flex items-center">
              <div className="mt-3 w-full flex flex-col items-center gap-2">
                <textarea
                  placeholder="Reply"
                  className="w-full h-16 border border-[#27272a] bg-transparent rounded-md p-2"
                />
                <div className="w-full flex justify-end items-end gap-2">
                  <button className="ml-2 flex justify-end items-end w bg-[#27272a] text-white px-5 py-2 rounded-md">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
}
