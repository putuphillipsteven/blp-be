import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStatusQuery = async () => {
  try {
    const res = await prisma.status.findMany();
    return res;
  } catch (err) {
    throw err;
  }
};
