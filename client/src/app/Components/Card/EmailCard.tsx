import React from "react";
import { formatDistanceToNow } from "date-fns";

interface EmailData {
  sender: string;
  subject: string;
  date: string;
}

interface EmailCardProps {
  data: EmailData[];
}

export default function EmailCard({ data }: EmailCardProps) {
  return (
    <>
      {data &&
        data.map((email, index) => (
          <div
            key={index}
            className="w-full bg-transparent hover:bg-[#27272a] flex flex-col h-36 rounded-xl border border-[#27272a] mb-4"
          >
            <div className="p-2 ml-4 flex flex-col gap-2">
              <div className="flex justify-between items-center gap-10">
                <div data-sender="" className="text-md font-bold">
                  {email.sender || "Atalay Özyıldırım"}
                </div>
                <div data-date className="flex text-sm mr-5">
                  {formatDistanceToNow(new Date(email.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-sm -mt-2">{email.subject || "Subject"}</div>
              <div className="text-sm text-gray-500">{email.subject}</div>
            </div>
          </div>
        ))}
    </>
  );
}
