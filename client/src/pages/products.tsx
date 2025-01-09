import { Layout } from "@/app/Components/Layout/Layout";
import ProductsPage from "@/app/Components/MainComp/ProductsPage";

export default function index() {
  return (
    <>
      <Layout>
        <ProductsPage />
      </Layout>
    </>
  );
}
