import { body, param } from "express-validator";
import mongoose from "mongoose";

export const validateSprintCreation = [
    body("fechaInicio").notEmpty().withMessage("La fecha de inicio es obligatoria"),
    body("fechaCierre").notEmpty().withMessage("La fecha de cierre es obligatoria"),
    body("color").notEmpty().withMessage("El color es obligatorio")
];

    export const validateAddTaskToSprint = [
    param("id").custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage("ID de sprint no válido"),
    param("taskId").custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage("ID de tarea no válido")
];