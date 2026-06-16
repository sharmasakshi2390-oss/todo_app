import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Server Running");
});

export default app;