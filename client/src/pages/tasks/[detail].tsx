import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Layout } from "@/app/Components/Layout/Layout";
import { useRouter } from "next/router";
import "./../../style/globals.css";
import baseClient from "@/api/BaseClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { detail } = context.params as { detail: string };
    const res = await baseClient(context).get(`/api/task/detail/${detail}`);

    return {
      props: {
        repo: res.data,
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  console.log(repo);
  return (
    <>
      <Layout>
        <div className="min-h-screen  w-full p-10">
          <h1 className="text-2xl font-bold text-left hover:underline">
            Task - {router.query.detail}
          </h1>
          <div className="min-w-screen flex"></div>
          <div className="flex min-w-screen justify-end items-end flex-col gap-1">
            <div className="w-96 h-auto border p-4 border-[#27272a] rounded-2xl">
              <h1 className="text-xl underline text-white cursor-pointer">
                Assignet To
              </h1>
              {repo &&
                repo?.assignedTo?.map(
                  (item: { _id: string; avatar: string; name: string }) => {
                    return (
                      <div key={item._id} className="flex flex-row gap-2">
                        <img
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
          <div className="w-2/3 min-h-screen  border p-4 border-[#27272a] rounded-2xl">
            <div className="w-full border-b-2 border-[#27272a] flex flex-row gap-2">
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
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>

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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
            aldatın mı beni bunu yaptın mı bana birşey söyle bundan böyleeee
            sakladın mı benden ihanetini Başka bir evrende en güzl halinle sen
            hayata karış ben daha fazla biteceğim kırgınım kendime düşüyorum
            gölgende henüz bilmesende belkli bir gün bileceğim
          </div>
        </div>
      </Layout>
    </>
  );
}
