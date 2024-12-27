import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Layout } from "@/app/Components/Layout/Layout";
import "./../style/globals.css";
import TaskPage from "@/app/Components/MainComp/TaskPage";
import baseClient from "@/api/BaseClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await baseClient(context).get("/api/task/list/1");

    return {
      props: {
        repo: data,
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
const Tasks = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <TaskPage
        data={
          repo &&
          repo.map(
            (item: { taskId: string; description: string; status: string }) => {
              return {
                task: item.taskId,
                description: item.description,
                status: item.status,
              };
            }
          )
        }
      />
    </Layout>
  );
};

export default Tasks;
