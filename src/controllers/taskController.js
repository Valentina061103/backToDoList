import Task from "../models/Task.js";
import Sprint from "../models/Sprint.js";

// Obtener todas las tareas (con filtro por estado y orden por fecha)
export const getTasks = async (req, res) => {
    try {
        const { estado, sort } = req.query;

        const filter = {};
        if (estado) {
            filter.estado = estado;
        }

        let sortOption = {};
        if (sort === "fechaLimiteAsc") {
            sortOption.fechaLimite = 1;
        } else if (sort === "fechaLimiteDesc") {
            sortOption.fechaLimite = -1;
        }

        const tasks = await Task.find(filter).sort(sortOption);
        if (tasks.length === 0) {
            return res.status(404).json({ message: "No se encontraron tareas con los filtros aplicados" });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
};

// Obtener una tarea por ID
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea", error: error.message });
    }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
    const { titulo, descripcion, estado, fechaLimite } = req.body;

    if (!titulo || !descripcion || !estado || !fechaLimite) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        });
    }

    const task = new Task({
        titulo,
        descripcion,
        estado,
        fechaLimite
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una tarea existente
export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Verificar si existe la tarea
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        // Verificar si está asociada a un Sprint
        const sprint = await Sprint.findOne({ tareas: taskId });
        if (sprint) {
            return res.status(400).json({ message: "No se puede eliminar una tarea asignada a un Sprint" });
        }

        const deleted = await Task.findByIdAndDelete(taskId);
        if (!deleted) {
            return res.status(404).json({ message: "Error al eliminar la tarea" });
        }

        res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};