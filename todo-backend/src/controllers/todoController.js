import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from "../services/todoService.js";

export const getAllTodos = async (req, res) => {
  const todos = await getTodos(req.user.id);
  res.json(todos);
};

export const addTodo = async (req, res) => {
  const { title } = req.body;

  const todo = await createTodo(title, req.user.id);

  res.status(201).json(todo);
};

export const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // FIX: id convert to Number
    const todo = await updateTodo(
      Number(id),
      title,
      req.user.id
    );

    res.json(todo);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // FIX: id convert to Number
    await deleteTodo(Number(id), req.user.id);

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};