import baseClient from "@/api/BaseClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Router from "next/router";
interface DropDownProps {
  data_id?: string;
  label_one: string;
  label_two: string;
  label_three?: string;
  label_four?: string;
}

export default function DropDown({
  data_id,
  label_one,
  label_two,
  label_three,
  label_four,
}: DropDownProps) {
  const pathname = Router.pathname;
  const deleteClick = async (id: string | undefined) => {
    switch (pathname) {
      case "/customers":
        await baseClient("Atalay").delete(`api/customer/delete/${id}`);
        break;
      case "/employers":
        await baseClient("Atalay").delete(`api/emp/delete/${id}`);
        break;
      case "/task":
        await baseClient("Atalay").delete(`api/task/delete/${id}`);
        break;
    }
  };

  const labelTwoClick = async (id: string | undefined) => {
    switch (pathname) {
      case "/tasks":
        Router.push(`/tasks/${id}`);
        break;
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{label_one}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => labelTwoClick(data_id)}>
            {label_two}
          </DropdownMenuItem>
          {label_three && (
            <DropdownMenuItem onClick={() => deleteClick(data_id)}>
              {label_three}
            </DropdownMenuItem>
          )}
          {label_four && <DropdownMenuItem>{label_four}</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
