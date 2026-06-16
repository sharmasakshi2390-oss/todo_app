import prisma from "../lib/prisma.js";

export const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
