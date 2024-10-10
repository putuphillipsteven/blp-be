import { PrismaClient, Product_Image } from '@prisma/client';
import { IProductImageRepository } from '../interfaces/product-image/i.product-image.repository';
import {
	CreateProductImageProps,
	DeleteProductImageProps,
} from '../interfaces/product-image/i.product-image';
import { ProductImage } from '../entities/product-image';

export class ProductImageRepository implements IProductImageRepository {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	async createProductImage(args: CreateProductImageProps): Promise<ProductImage | undefined> {
		try {
			const res = await this.prisma.product_Image.create({ data: args });
			return res;
		} catch (error) {
			throw error;
		}
	}
	async deleteProductImage(args: DeleteProductImageProps): Promise<ProductImage | undefined> {
		throw new Error('Method not implemented.');
	}
}
