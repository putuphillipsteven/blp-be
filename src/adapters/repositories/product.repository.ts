import { PrismaClient } from '@prisma/client';
import { Product } from '../../entities/product';
import {
	CreateProductProps,
	DeleteProductProps,
	GetProductDetailsProps,
	GetProductFilterProps,
	GetProductReturnProps,
	ProductUseCases,
	UpdateProductProps,
} from '../../use-cases/interfaces/product';

export class ProductRepository implements ProductUseCases {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	async getDetails(args: GetProductDetailsProps): Promise<Product | null> {
		try {
			const res = await this.prisma.product.findFirst({
				where: {
					id: args.id,
				},
				include: {
					product_category: true,
					product_image: true,
				},
			});
			return res;
		} catch (error) {
			throw error;
		}
	}
	// Delete Product
	async delete(args: DeleteProductProps): Promise<Product | undefined> {
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
	async get(args: GetProductFilterProps): Promise<GetProductReturnProps | undefined> {
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
				product_category: true,
				product_image: true,
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
	async update(args: UpdateProductProps): Promise<Product | undefined> {
		try {
			const argsToUpdate: any = {};

			if (args.product_name) argsToUpdate.product_name = args.product_name;
			if (args.product_price) argsToUpdate.product_price = Number(args.product_price);
			if (args.product_category_id)
				argsToUpdate.product_category_id = Number(args.product_category_id);
			if (args.product_description) argsToUpdate.product_description = args.product_description;

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
	async create(args: CreateProductProps): Promise<Product | undefined> {
		try {
			const product = await this.prisma.product.create({ data: args });
			return product;
		} catch (error) {
			throw error;
		}
	}
}
