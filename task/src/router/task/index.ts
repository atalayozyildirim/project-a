import express from "express";
import type { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { Task } from "../../model/TaskModel";

const router = express.Router();

enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

router.post(
  "/create",
  [body("description").isString().notEmpty()],
  async (req: Request, res: Response) => {
    const { description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const task = Task.build({ description, status: "pending" });
    await task.save();
    res.status(201).send(task);
  }
);
// ?
router.put(
  "/update/status/:taskId",
  [param("taskId").isString().notEmpty()],
  async (req: Request, res: Response) => {
    const { taskId } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const task = await Task.findOne({ taskId });

    if (!task) {
      throw new Error("Task not found");
    }

    task?.status === TaskStatus.DONE
      ? task?.status
      : (task.status = TaskStatus.IN_PROGRESS);
    task?.status === TaskStatus.IN_PROGRESS
      ? task?.status
      : (task.status = TaskStatus.DONE);

    await task?.save();

    res.status(200).json(task);
  }
);

router.delete(
  "/delete/:taskId",
  [param("taskId").isString().notEmpty()],
  async (req: Request, res: Response) => {
    const { taskId } = req.params;
    if (validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    }
    const task = await Task.findOne({ taskId });
    if (!task) {
      res.status(404).send("Task not found");
    }
    await task?.deleteOne();

    res.send("Task deleted");
  }
);
router.get("/list", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const tasks = await Task.find().limit(limit).skip(skip);
  const total = await Task.countDocuments();

  res.send({
    tasks,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
  res.send(tasks);
});
export default router;
