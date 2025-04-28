
import { param } from "express-validator";
import mongoose from "mongoose";

export const validateAddTaskToBacklog = [
    param("taskId").custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage("El ID de la tarea no es válido"),
];