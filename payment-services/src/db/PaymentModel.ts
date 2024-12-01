import mongoose from "mongoose";

interface PaymentAttr {
  userId: string;
  orderId: string;
  stripeId: string;
}
interface PaymentDoc extends mongoose.Document {
  userId: string;
  orderId: string;
  stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attr: PaymentAttr): PaymentDoc;
}

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  stripeId: {
    type: String,
    required: true,
  },
});

paymentSchema.statics.build = (attr: PaymentAttr) => {
  return new Payment(attr);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  paymentSchema
);

export { Payment };
