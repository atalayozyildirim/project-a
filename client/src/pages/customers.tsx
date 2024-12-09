import { Layout } from "@/app/Components/Layout/Layout";
import CustomerPage from "@/app/Components/MainComp/CustomerPage";
import FormInput from "@/app/Components/TextArea/FormInput";
import { useADDNavbar, AddNavbarContext } from "@/context/AddNavbarContext";

const Customer = () => {
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
          <CustomerPage />
        </AddNavbarContext>
      </Layout>
    </>
  );
};

export default Customer;
