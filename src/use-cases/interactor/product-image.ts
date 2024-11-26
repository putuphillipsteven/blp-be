import {
	CreateProductImageProps,
	DeleteProductImageProps,
	ProductImageUseCases,
} from '../interfaces/product-image';
import { Product_Image } from '@prisma/client';
import { ProductImageRepository } from '../../adapters/repositories/product-image';

export class ProductImageInteractor implements ProductImageUseCases {
	private repository: ProductImageRepository;
	constructor(repository: ProductImageRepository) {
		this.repository = repository;
	}

	async create(args: CreateProductImageProps): Promise<Product_Image | undefined> {
		try {
			const res = await this.repository.create(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async delete(args: DeleteProductImageProps): Promise<Product_Image | undefined> {
		try {
			const res = await this.repository.delete(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
}
