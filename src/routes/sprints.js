import express from "express";
import {
    getSprints,
    getSprintById,
    createSprint,
    updateSprint,
    deleteSprint,
    addTaskToSprint
} from "../controllers/sprintController.js";
import { validateSprintCreation, validateAddTaskToSprint } from "../validators/sprintValidator.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";

export const SprintRouter = express.Router();

SprintRouter.get("/", getSprints);
SprintRouter.get("/:id", getSprintById);
SprintRouter.post("/", validateSprintCreation, handleValidationErrors, createSprint);
SprintRouter.put("/:id", validateSprintCreation, handleValidationErrors, updateSprint);
SprintRouter.delete("/:id", deleteSprint);
SprintRouter.put("/:id/add-task/:taskId", validateAddTaskToSprint, handleValidationErrors, addTaskToSprint);