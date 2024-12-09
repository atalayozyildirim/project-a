import { Layout } from "@/app/Components/Layout/Layout";
import "./../style/globals.css";
import EmployersPage from "@/app/Components/MainComp/EmployersPage";
import { AddNavbarContext, useADDNavbar } from "@/context/AddNavbarContext";
import FormInput from "@/app/Components/TextArea/FormInput";

const Chart = () => {
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
          <EmployersPage />
        </AddNavbarContext>
      </Layout>
    </>
  );
};

export default Chart;
