import backlogSchema from "../models/Backlog.js";
import taskSchema from "../models/Task.js";
import sprintSchema from "../models/Sprint.js";


// Obtener el backlog y sus tareas
export const getBacklog = async (req, res) => {
try {
    const backlog = await backlogSchema.findOne().populate("tareas");
    if (!backlog) {
    return res.status(404).json({ message: "Backlog no encontrado" });
    }
    res.json(backlog);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

export const addTaskToBacklog = async (req, res) => {
const { taskId } = req.params;
  console.log(req.body);  // Ver los datos que llegan en el cuerpo de la solicitud
try {
    // Verificar si existe un backlog
    const backlog = await backlogSchema.findOne();
    if (!backlog) {
    return res.status(500).json({ message: "No hay un backlog existente" });
    }

    // Verificar si la tarea existe
    const task = await taskSchema.findById(taskId);
    if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Verificar si la tarea ya está asignada a un sprint
    const sprint = await sprintSchema.findOne({ tareas: taskId });
    if (sprint) {
    return res.status(400).json({ message: "La tarea ya está asignada a un Sprint y no puede ser agregada al backlog" });
    }
    // Verificar si la tarea ya está en el backlog
    if (backlog.tareas.includes(taskId)) {
    return res.status(400).json({ message: "La tarea ya está en el backlog" });
    }

    // Agregar la tarea al backlog
    backlog.tareas.push(taskId);
    await backlog.save();
    
    await task.save(); 
    res.status(200).json({ message: "Tarea agregada al backlog", task });
} catch (error) {
    res.status(500).json({ message: "Error al agregar tarea al backlog", error: error.message });
}
};


// Crear un backlog (si es que no existe)
export const createBacklog = async (req, res) => {
try {
    const existing = await backlogSchema.findOne();
    if (existing) {
    return res.status(400).json({ message: "Ya existe un backlog" });
    }

    const newBacklog = new backlogSchema({ tareas: [] });
    await newBacklog.save();
    res.status(201).json({ message: "Backlog creado correctamente", backlog: newBacklog });
} catch (error) {
    res.status(500).json({ message: "Error al crear backlog", error: error.message });
}
};