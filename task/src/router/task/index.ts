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
  [
    body("description").isString().notEmpty().withMessage("invalid params"),
    body("assignedTo").isString().notEmpty().withMessage("invalid params"),
    body("dueDate").isString().notEmpty().withMessage("invalid params"),
    body("priority").isString().notEmpty().withMessage("invalid params"),
    body("status").isString().notEmpty().withMessage("invalid params"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Not valid body !");
    }
    const task = Task.build(req.body);

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
      throw new Error("Not valid params !");
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
      throw new Error("Not valid params !");
    }
    const task = await Task.findOne({ taskId });
    if (!task) {
      res.status(404).send("Task not found");
    }
    await task?.deleteOne();

    res.send("Task deleted");
  }
);
router.get(
  "/list/:page",
  [param("page").isEmpty().withMessage("invalid params")],
  async (req: Request, res: Response) => {
    const { page } = req.params;

    if (validationResult(req).isEmpty()) {
      throw new Error("Not valid params !");
    }
    const tasks = await Task.find()
      .skip(parseInt(page) * 10)
      .limit(10);

    res.status(200).json(tasks);
  }
);
export default router;
