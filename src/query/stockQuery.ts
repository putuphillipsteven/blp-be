import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateStockQuery = async (
  id: number,
  branch_id: number,
  product_id: number,
  quantity: number
): Promise<any> => {
  try {
    const res = await prisma.stock.updateMany({
      where: {
        id: id,
        branch_id: branch_id,
      },
      data: {
        id: Number(id),
        branch_id: branch_id,
        product_id: product_id,
        quantity: quantity,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
