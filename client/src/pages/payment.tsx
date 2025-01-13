import React from "react";
import { Layout } from "@/app/Components/Layout/Layout";
import PaymentPage from "@/app/Components/MainComp/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./../style/globals.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Payment() {
  return (
    <>
      <Layout>
        <Elements stripe={stripePromise}>
          <PaymentPage />
        </Elements>
      </Layout>
    </>
  );
}
