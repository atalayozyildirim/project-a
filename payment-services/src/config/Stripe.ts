import Stripe from "stripe";

const stripe = new Stripe(Bun.env.STRIPE_SECRETS!, {
  apiVersion: "2024-11-20.acacia",
});

export default stripe;
