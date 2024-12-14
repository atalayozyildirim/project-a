import mongoose from "mongoose";

interface TaskAttr {
  description: string;
  status: string;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attr: TaskAttr): TaskDoc;
}

interface TaskDoc extends mongoose.Document {
  description: string;
  status: string;
}

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
taskSchema.pre("save", function (next) {
  if (!this.taskId) {
    this.taskId = new mongoose.Types.ObjectId().toString();
  }
  next();
});

taskSchema.statics.build = (attr: TaskAttr) => {
  return new Task(attr);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Task", taskSchema);

export { Task };
