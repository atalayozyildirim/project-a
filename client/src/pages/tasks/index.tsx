import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Layout } from "@/app/Components/Layout/Layout";
import "./../../style/globals.css";
import TaskPage from "@/app/Components/MainComp/TaskPage";
import baseClient from "@/api/BaseClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await baseClient(context).get("/api/task/list/0");

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
  console.log(repo);
  return (
    <Layout>
      <TaskPage
        data={
          repo &&
          repo.map(
            (item: {
              taskId: string;
              description: string;
              assignedTo: string;
              dueDate: string;
              priority: string;
              status: string;
            }) => {
              return {
                task: item.taskId,
                description: item.description,
                assignedTo: item.assignedTo,
                dueDate: item.dueDate,
                priority: item.priority,
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
