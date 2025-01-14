import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://tickets.dev/api/payment/success",
      },
    });

    if (error) {
      console.error(error);
    } else {
      // Ödeme işlemini sunucuya gönderin
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="payment-form bg-[#171c1e] p-5 w-1/2 rounded-xl h-96"
      >
        {clientSecret && <PaymentElement id="payment-element" />}
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="p-2 bg-[#53FC18] text-white rounded-md w-36 mt-8"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentCard;
