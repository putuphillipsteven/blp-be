import {
	CreateProductImageProps,
	DeleteProductImageProps,
	ProductImageUseCases,
} from '../interfaces/product-image';
import { ProductImage } from '../../entities/product-image';
import { ProductImageRepository } from '../../adapters/repositories/product-image.repository';

export class ProductImageInteractor implements ProductImageUseCases {
	private repository: ProductImageRepository;
	constructor(repository: ProductImageRepository) {
		this.repository = repository;
	}

	async create(args: CreateProductImageProps): Promise<ProductImage | undefined> {
		try {
			const res = await this.repository.create(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async delete(args: DeleteProductImageProps): Promise<ProductImage | undefined> {
		try {
			const res = await this.repository.delete(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
}
