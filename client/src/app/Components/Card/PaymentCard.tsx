import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardElement,
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

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement!,
        },
      }
    );

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentIntent:", paymentIntent);
      // Ödeme işlemini sunucuya gönde
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="payment-form">
        <PaymentElement id="payment-element" />
        {clientSecret && <PaymentElement id="payment-element" />}
        <button type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentCard;
