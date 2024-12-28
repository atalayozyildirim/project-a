import React from "react";
import Badge from "../Button/Badge";
import { useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "../TextArea/FormInput";

interface Item {
  task: string;
  description: string;
  status: boolean;
}
interface TaskPageProps {
  data: Item[];
}
export default function TaskPage({ data }: TaskPageProps) {
  const { showAddI, showAdd } = useADDNavbar();

  return (
    <>
      {showAdd && (
        <FormInput fields="Task" textOne="Description" close={showAddI} />
      )}
      <div className="p-10 w-full min-h-screen">
        <h1 className="text-2xl font-bold hover:underline">Task</h1>
        <div className="mt-5">
          <table className="table-auto w-full rounded-md">
            <thead className="border border-[#27272a]  text-white">
              <tr>
                <th className="px-4 py-2 text-left">Task</th>
                <th className="px-4 py-2 text-left w-1/2">Description</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={index} className="border-t border-[#27272a]">
                    <td className="px-4 py-2 hover:underline">{item.task}</td>
                    <td className="px-4 py-2 w-1/2 hover:underline">
                      {item.description}
                    </td>
                    <td className="px-4 py-2">
                      <Badge
                        text={item.status ? "Procsess" : "Done"}
                        badgeIcon={true}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
