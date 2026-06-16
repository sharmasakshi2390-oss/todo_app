import prisma from "../lib/prisma.js";

export const getTodos = async (userId) => {
  return await prisma.todo.findMany({
    where: { userId },
  });
};

export const createTodo = async (title, userId) => {
  return await prisma.todo.create({
    data: {
      title,
      userId,
    },
  });
};

export const updateTodo = async (id, title, userId) => {
      const todo = await prisma.todo.findFirst({
    where: {
      id: Number(id),
      userId,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  return await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
    },
  });
};

export const deleteTodo = async (id, userId) => {
    const todo = await prisma.todo.findFirst({
    where: {
      id: Number(id),
      userId,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  return await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
};