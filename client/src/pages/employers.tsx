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

const Employers = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { showAddI, showAdd } = useADDNavbar();

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
