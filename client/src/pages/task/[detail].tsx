import { Layout } from "lucide-react";
import { useRouter } from "next/router";
import "./../../style/globals.css";

export default function TaskDetail() {
  const router = useRouter();

  return (
    <>
      <Layout>
        <div>{router.query.detail}</div>
      </Layout>
    </>
  );
}
