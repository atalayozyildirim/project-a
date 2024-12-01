import React from "react";
import "./../style/globals.css";
import { Layout } from "@/app/Components/Layout/Layout";
import HomePage from "@/app/Components/MainComp/HomePage";

const Home = () => {
  return (
    <>
      <Layout>
        <HomePage />
      </Layout>
    </>
  );
};
export default Home;
