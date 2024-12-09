import mongoose from "mongoose";

interface CustomerAttrs {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

interface CustomerDoc extends mongoose.Document {
  name: string;
  surname: string;
  email: string;
  phonenumber: string;
}

interface CustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc;
}

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
});

customerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>(
  "Customer",
  customerSchema
);

export { Customer };
