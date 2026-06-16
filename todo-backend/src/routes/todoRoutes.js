import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllTodos, addTodo, editTodo, removeTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllTodos);
router.post("/", authMiddleware, addTodo);
router.patch("/:id", authMiddleware, editTodo);
router.delete("/:id", authMiddleware, removeTodo);

export default router;