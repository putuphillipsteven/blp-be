import { Product_Category } from '@prisma/client';
import {
	CreateProductCategoryProps,
	UpdateProductCategoryProps,
	DeleteProductCategoryProps,
	ProductCategoryUseCases,
	GetProductDetailsProps, GetProductCategoryReturnProps,
} from '../interfaces/product-category.interface';
import { ProductCategoryRepository } from '../../adapters/repositories/product-category.repository';

export class ProductCategoryInteractor implements ProductCategoryUseCases {
	private repository: ProductCategoryRepository;

	constructor(repository: ProductCategoryRepository) {
		this.repository = repository;
	}
	async getDetails(args: GetProductDetailsProps): Promise<any | null> {
		try {
			const res = await this.repository.getDetails(args);
			return res;
		} catch (error) {
			throw error;
		}
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
		try {
			const res = await this.repository.update(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async delete(args: DeleteProductCategoryProps): Promise<Product_Category | undefined> {
		try {
			const res = await this.repository.delete(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
}
