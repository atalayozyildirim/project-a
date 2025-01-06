import mongoose from "mongoose";

interface UserAttr {
  userId: string;
  email: string;
  name: string;
  task: string[];
  role: string;
}

interface UserDoc extends mongoose.Document {
  userId: string;
  email: string;
  name: string;
  task: string[];
  role: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc;
}

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  task: {
    type: [String],
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attr: UserAttr) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { User };
