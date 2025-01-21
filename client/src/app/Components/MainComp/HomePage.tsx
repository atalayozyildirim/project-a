import React from "react";
import { DetailCard } from "../Card/DetailCard";
import baseClient from "@/api/BaseClient";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import Badge from "../Button/Badge";

interface IData {
  sales: string;
  orders: string;
  customers: string;
}

const HomePage = () => {
  const [detailData, setDataDetail] = React.useState<IData | null>(null);
  const [tasks, setTasks] = React.useState([]);

  const { user } = useAuth();

  const getData = async () => {
    const response = await baseClient("atalay").get("api/chart/home/all");
    setDataDetail(response.data);
  };

  const getTasks = async () => {
    if (user) {
      const response = await axios.post("/api/task/my/task", {
        userId: user?.userId,
      });
      setTasks(response.data);
    }
  };
  React.useEffect(() => {
    getData();
    getTasks();
  }, []);

  return (
    <>
      <div className="p-10 w-full  min-h-screen">
        <h1 className="text-2xl  font-bold hover:underline">Home</h1>
        <div className="flex flex-row gap-2 mt-4">
          <div className="w-10/12">
            <div className="charts">
              <div className="top flex flex-row gap-2 ">
                {detailData && (
                  <>
                    <DetailCard
                      icon={
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
                            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                          />
                        </svg>
                      }
                      id={0}
                      title={"Sales"}
                      value={detailData.sales}
                    />
                    <DetailCard
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          ></path>
                        </svg>
                      }
                      id={1}
                      title={"Orders"}
                      value={detailData.orders}
                    />
                    <DetailCard
                      icon={
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
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                      }
                      id={2}
                      title={"Customers"}
                      value={detailData.customers}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-1  p-2">
            <div className="table-auto border border-[#27272e] bg-[#141517] rounded-lg  p-3 shadow-md">
              <h1>My Tasks</h1>
              <ul className="list-none mt-4">
                {tasks &&
                  tasks.map(
                    (
                      task: {
                        description: string;
                        status: string;
                        taskId: string;
                      },
                      i
                    ) => {
                      return (
                        <>
                          <Link href={`/tasks/${task.taskId}`}>
                            <li
                              className="flex flex-row justify-between p-2 border-b border-[#27272e]"
                              data-id={i}
                            >
                              <span>{task.description}</span>
                              <Badge
                                text={task.status ? "Procsess" : "Done"}
                                badgeIcon={true}
                              />
                            </li>
                          </Link>
                        </>
                      );
                    }
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
