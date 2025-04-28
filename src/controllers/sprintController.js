import sprintSchema from "../models/Sprint.js"
import taskSchema from "../models/Task.js"
//traer todas las sprints
export const getSprints = async (req, res) => {
    try {
        const sprints = await sprintSchema.find().populate('tareas')
        res.json(sprints)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//obtener un sprint por su id
export const getSprintById = async (req, res) => {
    try {
        const sprint = await sprintSchema.findById(req.params.id).populate("tareas");
        if (!sprint) return res.status(404).json({ message: "Sprint no encontrado" });
        res.json(sprint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//crear una sprint nueva
export const createSprint = async (req, res) => {
    try {
        const { fechaInicio, fechaCierre, color } = req?.body
        const newSprint = new sprintSchema({
            fechaInicio,
            fechaCierre,
            color,
            tareas: [],
        });
        await newSprint.save();
        res.status(201).json(newSprint);

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
//actualizar una sprint
export const updateSprint = async (req, res) => {
    try {
        const updatedSprint = await sprintSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedSprint) {
            return res.status(404).json({ message: "Sprint no encontrada" });
        }
        res.status(200).json(updatedSprint);
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
//eliminar una sprint
export const deleteSprint = async (req, res) => {
    try {
        const sprintId = req.params.id
        const deleted = await sprintSchema.findByIdAndDelete(sprintId)
        if (!deleted) {
            return res.status(404).json({ message: "Sprint no encontrada" });
        }

        res.status(200).json({ message: "Sprint eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//agregar una tarea a una sprint

export const addTaskToSprint = async (req, res) => {
    const { id, taskId } = req.params;
    
    try {
      // Buscar el sprint
        const sprint = await sprintSchema.findById(id);
        if (!sprint) {
            return res.status(404).json({ message: "Sprint no encontrado" });
        }
        
        // Buscar la tarea
        const task = await taskSchema.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
    
        // Verificar si la tarea ya está asignada a otro sprint
        if (task.sprint) {
            return res.status(400).json({ message: "La tarea ya está asignada a otro Sprint" });
        }
        
        // Verificar si la tarea ya está en el sprint actual
        if (sprint.tareas.includes(taskId)) {
            return res.status(400).json({ message: "La tarea ya está en el sprint" });
        }
    
        // Agregar la tarea al sprint
        sprint.tareas.push(taskId);
        task.sprint = sprint._id;
        await sprint.save();
        await task.save(); 
        
        res.status(200).json({ message: "Tarea agregada al sprint", sprint });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };