import express from "express";
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";
import { validateTask } from "../validators/taskValidator.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";

export const TaskRouter = express.Router();

TaskRouter.get("/", getTasks);
TaskRouter.get("/:id", getTaskById);
TaskRouter.post("/", validateTask, handleValidationErrors, createTask);
TaskRouter.put("/:id", validateTask, handleValidationErrors, updateTask);
TaskRouter.delete("/:id", deleteTask);