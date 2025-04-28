import mongoose from "mongoose";

const backlogSchema = new mongoose.Schema({
    tareas:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }]
})
export default mongoose.model("Backlog",backlogSchema);