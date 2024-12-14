import mongoose from "mongoose";

interface EmailAttrs {
  userId: string;
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  secure: boolean;
  tls: boolean;
}

interface EmailDoc extends mongoose.Document {
  userId: string;
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  secure: boolean;
  tls: boolean;
}

interface EmailModel extends mongoose.Model<EmailDoc> {
  build(attrs: EmailAttrs): EmailDoc;
}

const emailSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    auth: {
      user: {
        type: String,
        required: true,
      },
      pass: {
        type: String,
        required: true,
      },
    },
    port: {
      type: Number,
      required: true,
    },
    tls: {
      type: Boolean,
      required: true,
    },
    secure: {
      type: Boolean,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

emailSchema.statics.build = (attrs: EmailAttrs) => {
  return new Email(attrs);
};

const Email = mongoose.model<EmailDoc, EmailModel>("Email", emailSchema);

export { Email };
