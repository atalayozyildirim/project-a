import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface AuthAttrs {
  email: string;
  password: string;
  name: string;
  lastIpAddress?: string;
  lastLoginAt?: Date;
}
export interface AuthModel extends mongoose.Document {
  email: string;
  password: string;
  name: string;
}

interface AuthModelStatic extends mongoose.Model<AuthModel> {
  build(attrs: AuthAttrs): AuthModel;
}

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

authSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await bcrypt.hash(this.get("password"), 8);
    this.set("password", hashed);
  }
  done();
});

authSchema.statics.build = (attrs: AuthAttrs) => {
  return new Auth(attrs);
};

const Auth = mongoose.model<AuthModel, AuthModelStatic>("Auth", authSchema);

export { Auth };
