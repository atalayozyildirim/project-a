import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Layout } from "@/app/Components/Layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import "./../../style/globals.css";
import baseClient from "@/api/BaseClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { detail } = context.params as { detail: string };
    const res = await baseClient(context).get(`/api/task/detail/${detail}`);
    const users = await baseClient(context).get(
      `/api/task/assigned/${res.data.assignedTo}`
    );

    return {
      props: {
        repo: res.data,
        users: users.data,
      },
    };
  } catch {
    return {
      props: {
        repo: [],
      },
    };
  }
};

export default function TaskDetail({
  repo,
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleClickDone = async () => {
    if (repo?.status === "Done") {
      return;
    }
    const res = await baseClient("Atalay").put(
      `api/task/update/status/${router.query.detail}`
    );

    console.log(res.data);
  };

  const handleClickDelete = async () => {
    const res = await baseClient("Atalay").delete(
      `api/task/delete/${router.query.detail}`
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    res.status === 200 && router.push("/tasks");
  };
  return (
    <>
      {repo ? (
        <Layout>
          <div className="min-h-screen  w-full p-10">
            <h1 className="text-2xl font-bold text-left hover:underline">
              Task - {router.query.detail}
            </h1>
            <div className="min-w-screen flex flex-row gap-4 mt-4">
              <div className="flex min-w-screen  flex-col gap-1">
                <div className="w-96 h-auto border p-4 border-[#27272a] rounded-2xl">
                  <h1 className="text-xl hover:underline text-white cursor-pointer">
                    Assignet To
                  </h1>

                  {repo &&
                    users?.map(
                      (item: { _id: string; avatar: string; name: string }) => {
                        return (
                          <div
                            key={item._id}
                            className="flex mt-4 flex-row gap-2"
                          >
                            <Image
                              src={item.avatar || "next.svg"}
                              alt="avatar"
                              className="w-10 h-10 rounded-full"
                            />
                            <h1 className="text-lg text-white">{item.name}</h1>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
              <div className="w-3/4 min-h-screen  border p-4 border-[#27272a] rounded-2xl">
                <div className="w-full border-b-2  border-[#27272a] flex flex-row gap-4 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={handleClickDone}
                    className="size-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
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
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={handleClickDelete}
                    className="size-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
                <div className="w-full p-4">
                  <h1 className="text-xl text-white">Description</h1>
                  <p className="text-white mt-4">
                    {repo?.description || "No Description"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <p className="flex justify-center items-center w-screen h-screen text-2xl">
          Not Found Task{" "}
        </p>
      )}
    </>
  );
}
