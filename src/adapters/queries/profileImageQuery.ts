import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UpdateProfileQuery = async (id: number, image: string) => {
	try {
		// const res = await prisma.avatar.updateMany({
		//   where: {
		//     id: id,
		//   },
		//   data: {
		//     image: image,
		//   },
		// });
		// return res;
	} catch (err) {
		throw err;
	}
};
