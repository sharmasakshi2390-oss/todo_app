import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import rateLimit from "express-rate-limit";
const app = express();
app.set("trust proxy", 1);

const limiter = rateLimit({
    windowMs: 15 * 20 * 1000, //20 s
    max: 300,
    message: {
        sucess: true,
        message: "Limit reached kindly try after 1 min"

    }
});

app.use(limiter);
app.use(cors());
app.use(express.json());

const limiteuserr = rateLimit({
    windowMs: 10 * 1000, //10 second,
    max: 100,
    message : {
        sucess : true,
        message: "Limit reached kindly try after 1 min"

    }
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Server Running");
});

export default app;