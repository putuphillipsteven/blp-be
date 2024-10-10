import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProductCategoryQuery = async (product_category_name: any) => {
	try {
		const res = await prisma.product_Category.create({
			data: {
				product_category_name: product_category_name,
			},
		});
		return res;
	} catch (err) {
		throw err;
	}
};

export const updateProductCategoryQuery = async (id: number, product_category_name: string) => {
	try {
		const res = await prisma.product_Category.update({
			where: {
				id,
			},
			data: {
				product_category_name,
			},
		});
		return res;
	} catch (err) {
		throw err;
	}
};

export const getProductCategoryQuery = async () => {
	try {
		const res = await prisma.product_Category.findMany();
		return res;
	} catch (err) {
		throw err;
	}
};

export const getProductGroupQuery = async () => {
	try {
		// const res = await prisma.product_Group.findMany();
		// return res;
	} catch (err) {
		throw err;
	}
};

export const deleteProductCategoryQuery = async (id: number) => {
	try {
		const res = await prisma.product_Category.delete({
			where: {
				id: id,
			},
		});
		return res;
	} catch (err) {
		throw err;
	}
};
