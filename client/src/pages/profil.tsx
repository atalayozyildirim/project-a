import ProfilePage from "@/app/Components/MainComp/ProfilePage";
import { Layout } from "@/app/Components/Layout/Layout";
import "./../style/globals.css";

import React from "react";

export default function Profile() {
  return (
    <>
      <Layout>
        <ProfilePage avatarName={""} avatarImage="" event="" />
      </Layout>
    </>
  );
}
