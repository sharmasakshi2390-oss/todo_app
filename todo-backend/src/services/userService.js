import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

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

export const updateUserProfile = async (
  id,
  fullname,
  email
) => {
  return await prisma.user.update({
    where: { id },
    data: {
      fullname,
      email,
    },
    select: {
      id: true,
      fullname: true,
      email: true,
    },
  });
};

export const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
  },
});

const isMatch = await bcrypt.compare(
  currentPassword,
  user.password
);

if (!isMatch) {
  throw new Error("Current password is incorrect");
}

const hashedPassword = await await bcrypt.hash(
  newPassword,
  10
);

return await prisma.user.update({
  where: {
    id: userId,
  },
  data: {
    password: hashedPassword,
  },
});
};

export const verifyUserEmail = async (token) => {
  const user = await prisma.user.findFirst({
    where: {
      verifyToken: token,
    },
  });

  if (!user) {
    throw new Error("Invalid token");
  }

  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
      verifyToken: null,
    },
  });
};

export const saveResetToken = async (
  email,
  resetToken
) => {
  return await prisma.user.update({
    where: { email },
    data: { resetToken },
  });
};

export const resetUserPassword = async (
  token,
  newPassword
) => {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
    },
  });

  if (!user) {
    throw new Error("Invalid token");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetToken: null,
    },
  });
};