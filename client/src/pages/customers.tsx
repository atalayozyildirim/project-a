import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import CustomerPage from "@/app/Components/MainComp/CustomerPage";
import FormInput from "@/app/Components/TextArea/FormInput";
import { useADDNavbar, AddNavbarContext } from "@/context/AddNavbarContext";
import baseClient from "@/api/BaseClient";
import { Layout } from "lucide-react";

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
      <Layout>
        <AddNavbarContext>
          <CustomerPage data={repo} />
        </AddNavbarContext>
      </Layout>
    </>
  );
};

export default Customer;
