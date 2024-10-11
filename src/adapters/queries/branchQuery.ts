import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBranchIdQuery = async (id: number) => {
	try {
		const res = await prisma.branch.findMany({
			where: {
				id,
			},
			include: {
				stock: {
					include: {
						// product: true,
					},
				},
			},
		});
		return res;
	} catch (err) {
		throw err;
	}
};
