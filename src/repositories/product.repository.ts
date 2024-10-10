import { PrismaClient } from '@prisma/client';

import { IProductRepository } from '../interfaces/product/i.product.repository';
import { Product } from '../entities/product';
import {
	CreateProductProps,
	DeleteProductProps,
	GetProductFilterProps,
	GetProductReturnProps,
	UpdateProductProps,
} from '../interfaces/product/i.product';

export class ProductRepository implements IProductRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	// Delete Product
	async deleteProduct(args: DeleteProductProps): Promise<Product | undefined> {
		try {
			const checkProductExists = await this.prisma.product.findUnique({ where: { id: args.id } });
			if (!checkProductExists) throw new Error('Product doesnt exist');
			const res = await this.prisma.product.delete({ where: { id: args.id } });
			return res;
		} catch (error) {
			throw error;
		}
	}

	// Get Product
	async getProduct(args: GetProductFilterProps): Promise<GetProductReturnProps | undefined> {
		try {
			const skip = (Number(args.page) - 1) * Number(args.pageSize);
			const take = Number(args.pageSize);

			const newFilter = {
				skip,
				take,
				where: {} as any,
				orderBy: {} as any,
			};

			const totalFilter = {
				where: {} as any,
			};

			const newInclude = {
				// status: true,
				product_category: true,
				// stock: {} as any,
			};

			if (args.product_name) {
				newFilter.where.product_name = {
					...newFilter.where.product_name,
					contains: args?.product_name,
				};
				totalFilter.where.product_name = {
					...totalFilter.where.product_name,
					contains: args?.product_name,
				};
			}

			/* 
			Product group contains just food/beverages.
			*/

			if (args.product_category_id) {
				totalFilter.where.product_category_id = {
					...totalFilter.where.product_category_id,
					equals: Number(args.product_category_id),
				};
			}

			/* 
			Product category contains just kitchen/grocery
			*/
			if (args.product_category_id) {
				newFilter.where.product_category_id = {
					...newFilter.where.product_category_id,
					equals: Number(args.product_category_id),
				};
				totalFilter.where.product_category_id = {
					...totalFilter.where.product_category_id,
					equals: Number(args.product_category_id),
				};
			}

			// if (args?.stock) {
			// 	newFilter.where = {
			// 		...newFilter.where,
			// 		stock: {
			// 			some: {
			// 				quantity: { gt: 0, lte: args?.stock },
			// 			},
			// 		},
			// 	};
			// 	totalFilter.where = {
			// 		...totalFilter.where,
			// 		stock: {
			// 			some: {
			// 				quantity: { gt: 0, lte: args?.stock },
			// 			},
			// 		},
			// 	};
			// }

			// if (args?.stock) {
			// 	newInclude.stock = {
			// 		where: { branch_id: { equals: args?.branch_id } },
			// 		include: {
			// 			branch: {
			// 				select: { branch_name: true },
			// 			},
			// 		},
			// 	};

			// 	newFilter.where = {
			// 		stock: {
			// 			some: {
			// 				AND: [
			// 					{
			// 						branch_id: { equals: args?.branch_id },
			// 					},
			// 					{
			// 						quantity: { gt: 0, lte: args?.stock },
			// 					},
			// 				],
			// 			},
			// 		},
			// 	};

			// 	totalFilter.where = {
			// 		stock: {
			// 			some: {
			// 				AND: [
			// 					{
			// 						branch_id: { equals: args?.branch_id },
			// 					},
			// 					{
			// 						quantity: { gt: 0, lte: args?.stock },
			// 					},
			// 				],
			// 			},
			// 		},
			// 	};
			// }

			if (args?.sort) {
				newFilter.orderBy = {
					...newFilter.orderBy,
					product_name: args?.sort,
				};
			} else {
				newFilter.orderBy = {
					...newFilter.orderBy,
					product_name: 'asc',
				};
			}

			const total = await this.prisma.product.count({ ...totalFilter });
			const data = await this.prisma.product.findMany({
				...newFilter,
				include: {
					...newInclude,
				},
			});
			return {
				total,
				data,
			};
		} catch (error) {
			throw error;
		}
	}

	// Update Product
	async updateProduct(args: UpdateProductProps): Promise<Product | undefined> {
		try {
			const argsToUpdate: any = {};

			if (args.product_name) argsToUpdate.product_name = args.product_name;
			if (args.product_price) argsToUpdate.product_price = Number(args.product_price);
			if (args.product_category_id)
				argsToUpdate.product_category_id = Number(args.product_category_id);
			// if (args.product_image) argsToUpdate.product_image = args.product_image;
			if (args.product_description) argsToUpdate.product_description = args.product_description;
			// if (args.product_group_id) argsToUpdate.product_group_id = Number(args.product_group_id);
			// if (args.product_status_id) argsToUpdate.product_status_id = Number(args.product_status_id);

			const res = await this.prisma.product.update({
				where: { id: args.id },
				data: { ...argsToUpdate },
			});
			return res;
		} catch (error) {
			throw error;
		}
	}

	// Create Product
	async createProduct(args: CreateProductProps): Promise<Product | undefined> {
		try {
			const product = await this.prisma.product.create({ data: args });
			return product;
		} catch (error) {
			throw error;
		}
	}
}
