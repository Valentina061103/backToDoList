import { body } from "express-validator";

// Estados válidos
const estadosValidos = ["pendiente", "en_progreso", "completado"];

export const validateTask = [
    body("titulo")
        .notEmpty()
        .withMessage("El título es obligatorio"),
    
    body("estado")
        .notEmpty()
        .withMessage("El estado es obligatorio")
        .isIn(estadosValidos)
        .withMessage(`Estado inválido. Debe ser uno de: ${estadosValidos.join(", ")}`),

    body("fechaLimite")
        .notEmpty()
        .withMessage("La fecha límite es obligatoria")
        .isISO8601()
        .toDate()
        .withMessage("La fecha debe tener un formato válido (ISO8601)"),

    body("color")
        .optional()
        .isHexColor()
        .withMessage("El color debe ser un código hexadecimal válido (#RRGGBB)")
];