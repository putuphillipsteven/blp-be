import { Product_Category } from '@prisma/client';
import {
	GetProductCategoryReturnProps,
	CreateProductCategoryProps,
	UpdateProductCategoryProps,
	DeleteProductCategoryProps,
	ProductCategoryUseCases,
} from '../interfaces/product-category';
import { ProductCategoryRepository } from '../../adapters/repositories/product-category.repository';
import { ProductUseCases } from '../interfaces/product';

export class ProductCategoryInteractor implements ProductCategoryUseCases {
	private repository: ProductCategoryRepository;

	constructor(repository: ProductCategoryRepository) {
		this.repository = repository;
	}

	async get(): Promise<GetProductCategoryReturnProps | undefined> {
		try {
			const res = await this.repository.get();
			return res;
		} catch (error) {
			throw error;
		}
	}
	async create(args: CreateProductCategoryProps): Promise<Product_Category | undefined> {
		try {
			const res = await this.repository.create(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async update(args: UpdateProductCategoryProps): Promise<Product_Category | undefined> {
		throw new Error('Method not implemented.');
	}
	async delete(args: DeleteProductCategoryProps): Promise<Product_Category | undefined> {
		throw new Error('Method not implemented.');
	}
}