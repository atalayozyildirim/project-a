import { Layout } from "@/app/Components/Layout/Layout";
import "./../style/globals.css";
import InvoicePages from "@/app/Components/MainComp/InvoicePages";

const Invoice = () => {
  return (
    <Layout>
      <InvoicePages />
    </Layout>
  );
};
export default Invoice;
