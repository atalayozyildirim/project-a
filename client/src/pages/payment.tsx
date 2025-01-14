import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "@/app/Components/Layout/Layout";
import PaymentPage from "@/app/Components/MainComp/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./../style/globals.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Payment() {
  const [clientSecret, setClientSecret] = React.useState("");

  useEffect(() => {
    axios
      .post("/api/payment/create-payment-intent", {
        amount: 1000,
        currency: "usd",
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  }, []);

  const opt = {
    clientSecret: clientSecret,
  };

  return (
    <>
      <Layout>
        {clientSecret && (
          <Elements stripe={stripePromise} options={opt}>
            <PaymentPage />
          </Elements>
        )}
      </Layout>
    </>
  );
}
