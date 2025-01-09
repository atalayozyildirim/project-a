import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Layout } from "@/app/Components/Layout/Layout";
import ProductsPage from "@/app/Components/MainComp/ProductsPage";
import "./../style/globals.css";
import baseClient from "@/api/BaseClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await baseClient(context).get("/api/task/list/1");

    return {
      props: {
        repos: res.data,
      },
    };
  } catch {
    return {
      props: {
        repos: [],
      },
    };
  }
};

export default function index({
  repos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout>
        <ProductsPage data={repos} />
      </Layout>
    </>
  );
}
