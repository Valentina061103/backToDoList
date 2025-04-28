import express from "express";
import {
    getBacklog,
    addTaskToBacklog,
    createBacklog
} from "../controllers/backlogController.js";
import { validateAddTaskToBacklog } from "../validators/backlogValidator.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";

export const BacklogRouter = express.Router();

BacklogRouter.get("/", getBacklog);
BacklogRouter.post("/", createBacklog);
BacklogRouter.put("/add-task/:taskId", validateAddTaskToBacklog,handleValidationErrors,addTaskToBacklog);