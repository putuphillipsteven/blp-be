import { Product_Category } from '@prisma/client';
import {
	GetProductCategoryReturnProps,
	CreateProductCategoryProps,
	UpdateProductCategoryProps,
	DeleteProductCategoryProps,
} from '../interfaces/product-category/i.product-category';
import { IProductCategoryInteractor } from '../interfaces/product-category/i.product-category.interactor';
import { IProductCategoryRepository } from '../interfaces/product-category/i.product-category.repository';

export class ProductCategoryInteractor implements IProductCategoryInteractor {
	private repository: IProductCategoryRepository;

	constructor(repository: IProductCategoryRepository) {
		this.repository = repository;
	}

	async get(): Promise<GetProductCategoryReturnProps | undefined> {
		try {
			const res = await this.repository.getProductCategory();
			return res;
		} catch (error) {
			throw error;
		}
	}
	async create(args: CreateProductCategoryProps): Promise<Product_Category | undefined> {
		try {
			const res = await this.repository.createProductCategory(args);
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
