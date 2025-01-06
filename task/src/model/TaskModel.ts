import mongoose from "mongoose";

interface TaskAttr {
  taskUd?: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  priority: string;
  status: string;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attr: TaskAttr): TaskDoc;
}

interface TaskDoc extends mongoose.Document {
  taskId: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  priority: string;
  status: string;
}

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
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
    this.taskId = "TASK-" + Math.floor(Math.random() * 1000000);
  }
  next();
});

taskSchema.statics.build = (attr: TaskAttr) => {
  return new Task(attr);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Task", taskSchema);

export { Task };
