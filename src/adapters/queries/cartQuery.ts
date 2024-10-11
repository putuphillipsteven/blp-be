import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCartQuery = async (customer_name: string) => {
  try {
    const res = await prisma.cart.create({
      data: {
        customer_name: customer_name,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
