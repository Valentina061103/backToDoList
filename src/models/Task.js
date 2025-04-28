import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    estado: {
        type: String,
        enum: ["pendiente", "en_progreso", "completado"],
        required: true
    },
    fechaLimite: { type: Date, required: true },
});

export default mongoose.model("Task", taskSchema);