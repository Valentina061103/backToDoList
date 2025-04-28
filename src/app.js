import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Importar routers
import { TaskRouter } from "./routes/tasks.js";
import { SprintRouter } from "./routes/sprints.js";
import { BacklogRouter } from "./routes/backlog.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas base
app.use("/tasks", TaskRouter);
app.use("/sprints", SprintRouter);
app.use("/backlog", BacklogRouter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('------------- Conectado a MongoDB'))
.catch((err) => console.error('------------- Error de conexión a MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`------------- Servidor corriendo en puerto ${PORT}`));