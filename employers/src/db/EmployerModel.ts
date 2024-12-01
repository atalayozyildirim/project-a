import mongoose from "mongoose";

interface EmployerAttr {
  name: string;
  surname: string;
  phoneNumber: number;
  Salary: number;
  email: string;
  filed: string;
}
interface EmployerDoc extends mongoose.Document {
  name: string;
  surname: string;
  phoneNumber: number;
  Salary: number;
  email: string;
  filed: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface ProductModel extends mongoose.Model<EmployerDoc> {
  build(attr: EmployerAttr): EmployerDoc;
}

const employerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    Salary: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    filed: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: "version",
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
employerSchema.statics.build = (attr: EmployerAttr) => {
  return new Employer(attr);
};

const Employer = mongoose.model<EmployerDoc, ProductModel>(
  "employer",
  employerSchema
);

export { Employer };
