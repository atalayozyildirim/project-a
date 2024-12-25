import { Layout } from "@/app/Components/Layout/Layout";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import "./../style/globals.css";
import EmployersPage from "@/app/Components/MainComp/EmployersPage";
import { AddNavbarContext, useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "@/app/Components/TextArea/FormInput";
import baseClient from "@/api/BaseClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await baseClient(context).get("/api/emp/all");

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

<<<<<<< HEAD
const Employers = ({
=======
const Chart = ({
>>>>>>> 3e97845f70544a2fae8c5cc480265c9eede2d180
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { showAddI, showAdd } = useADDNavbar();

<<<<<<< HEAD
=======
  console.log(repo);
>>>>>>> 3e97845f70544a2fae8c5cc480265c9eede2d180
  return (
    <>
      {showAdd && (
        <FormInput
          fields="Employers"
          textOne="Name"
          textTwo="Email"
          textThree="Phone"
          textFour="Salary"
          close={showAddI}
        />
      )}
      <Layout>
        <AddNavbarContext>
          <EmployersPage data={repo} />
        </AddNavbarContext>
      </Layout>
    </>
  );
};

export default Employers;
