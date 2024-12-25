import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useADDNavbar } from "@/context/AddNavbarContext";
import CardTable from "../Card/CardTable";
import FormInput from "../TextArea/FormInput";

type Repo = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
};

export const getServerSideProps: GetServerSideProps = (async () => {
  const res = await fetch("/api/customer/all/1", {
    method: "GET",
  });

  const repo: Repo = await res.json();

  return {
    props: { repo },
  };
}) satisfies GetServerSideProps<{ repo: Repo }>;

export default function CustomerPage({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { showAddI, showAdd } = useADDNavbar();
  return (
    <>
      {showAdd && (
        <FormInput
          fields="Customers"
          textOne="Name"
          textTwo="Email"
          textThree="Phone"
          textFour="Company"
          close={showAddI}
        />
      )}
      <div className="min-h-screen  w-full p-10">
        <h1 className="text-2xl font-bold hover:underline">Customers</h1>
        <CardTable
          thead_one="Name"
          thead_two="Email"
          thead_three="Phone"
          thead_four="Company"
          data={repo}
        />
      </div>
    </>
  );
}
