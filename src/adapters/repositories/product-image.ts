import { PrismaClient } from '@prisma/client';
import {
	CreateProductImageProps,
	DeleteProductImageProps,
	ProductImageUseCases,
} from '../../use-cases/interfaces/product-image';
import { Product_Image } from '@prisma/client';

export class ProductImageRepository implements ProductImageUseCases {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	async create(args: CreateProductImageProps): Promise<Product_Image | undefined> {
		try {
			const res = await this.prisma.product_Image.create({ data: args });
			return res;
		} catch (error) {
			throw error;
		}
	}
	async delete(args: DeleteProductImageProps): Promise<Product_Image | undefined> {
		throw new Error('Method not implemented.');
	}
}
