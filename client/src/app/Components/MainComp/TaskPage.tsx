import React from "react";
import Badge from "../Button/Badge";
import { useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "../TextArea/FormInput";
import DropDown from "../Button/DropDown";

interface Item {
  task: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
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
        <FormInput
          fields="Tasks"
          textOne="Description"
          textTwo="AssignedTo"
          textThree="DueDate"
          textFour="Priority"
          close={showAddI}
        />
      )}
      <div className="p-10 w-full min-h-screen">
        <h1 className="text-2xl font-bold hover:underline">Task</h1>
        <div className="mt-5">
          <table className="table-auto w-full rounded-md">
            <thead className="border border-[#27272a]  text-white">
              <tr>
                <th className="px-4 py-2 text-left">Task-ID</th>
                <th className="px-4 py-2 text-left w-1/3">Description</th>
                <th className="px-4 py-2 text-left">AssignedTo</th>
                <th className="px-4 py-2 text-left">DueDate</th>
                <th className="px-4 py-2 text-left">Priority</th>
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
                    <td className="px-4 py-2 hover:underline">
                      {item.assignedTo}
                    </td>
                    <td className="px-4 py-2  hover:underline">
                      {item.dueDate}
                    </td>
                    <td className="px-4 py-2 hover:underline">
                      {item.priority}
                    </td>
                    <td className="px-4 py-2">
                      <Badge
                        text={item.status ? "Procsess" : "Done"}
                        badgeIcon={true}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <DropDown
                        label_one="Edit"
                        label_two="Detail"
                        label_three="Delete"
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
