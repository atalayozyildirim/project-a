import { Layout } from "@/app/Components/Layout/Layout";
import TaskPage from "@/app/Components/MainComp/TaskPage";

const Tasks = () => {
  return (
    <Layout>
      <TaskPage data={[]} />
    </Layout>
  );
};

export default Tasks;
