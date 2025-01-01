import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import CustomerPage from "@/app/Components/MainComp/CustomerPage";
import "./../style/globals.css";
import baseClient from "@/api/BaseClient";
import { Layout } from "@/app/Components/Layout/Layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await baseClient(context).get("/api/customer/all/1");

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

const Customer = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Layout>
        <CustomerPage data={repo} />
      </Layout>
    </>
  );
};

export default Customer;
