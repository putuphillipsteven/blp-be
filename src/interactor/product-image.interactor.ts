import { Product_Image } from '@prisma/client';
import {
	CreateProductImageProps,
	DeleteProductImageProps,
} from '../interfaces/product-image/i.product-image';
import { IProductImageInteractor } from '../interfaces/product-image/i.product-image.interactor';
import { IProductImageRepository } from '../interfaces/product-image/i.product-image.repository';
import { ProductImage } from '../entities/product-image';

export class ProductImageInteractor implements IProductImageInteractor {
	private repository: IProductImageRepository;
	constructor(repository: IProductImageRepository) {
		this.repository = repository;
	}

	async create(args: CreateProductImageProps): Promise<ProductImage | undefined> {
		try {
			const res = await this.repository.createProductImage(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async delete(args: DeleteProductImageProps): Promise<ProductImage | undefined> {
		try {
			const res = await this.repository.deleteProductImage(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
}
