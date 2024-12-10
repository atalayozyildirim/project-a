import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCard from "../Card/PaymentCard";

export default function PaymentPage() {
  const [secret, setSecret] = React.useState<string>("");

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    {
      apiVersion: "2024-11-20.acacia",
    }
  );

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/payment/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: "123",
            token: "tok_visa",
          }),
        });
        const data = await response.json();
        setSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    createPaymentIntent();
  }, []);
  return (
    <>
      {secret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: secret,
          }}
        >
          <div className="p-10 w-full  min-h-screen">
            <h1 className="text-2xl  font-bold hover:underline">
              Payment System
            </h1>
            <div>
              <PaymentCard />
            </div>
          </div>
        </Elements>
      )}
    </>
  );
}
