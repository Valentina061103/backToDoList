import mongoose, { Types } from "mongoose";
const sprintSchema=mongoose.Schema({
    fechaInicio:{type:String,required:true},
    fechaCierre:{type:String,required:true},
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
    color: { type: String },
})
export default mongoose.model("Sprint", sprintSchema);