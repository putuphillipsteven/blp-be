import { ProductRepository } from '../../adapters/repositories/product.repository';
import {
	CreateProductProps,
	DeleteProductProps,
	GetProductDetailsProps,
	GetProductFilterProps,
	GetProductReturnProps,
	ProductUseCases,
	UpdateProductProps,
} from '../interfaces/product.interface';
import {Product} from "@prisma/client";

export class ProductInteractor implements ProductUseCases {
	private repository: ProductRepository;

	constructor(repository: ProductRepository) {
		this.repository = repository;
	}
	async getDetails(args: GetProductDetailsProps): Promise<Product | null> {
		try {
			const res = await this.repository.getDetails(args);
			return res;
		} catch (error) {
			throw error;
		}
	}

	async delete(args: DeleteProductProps): Promise<Product | undefined> {
		try {
			const res = await this.repository.delete(args);
			return res;
		} catch (error) {
			throw error;
		}
	}

	async get(args: GetProductFilterProps): Promise<GetProductReturnProps | undefined> {
		try {
			const products = await this.repository.get(args);
			return products;
		} catch (error) {
			throw error;
		}
	}

	async update(args: UpdateProductProps): Promise<Product | undefined> {
		try {
			const product = await this.repository.update(args);
			return product;
		} catch (error) {
			throw error;
		}
	}

	async create(args: CreateProductProps): Promise<Product | undefined> {
		try {
			const product = await this.repository.create(args);
			return product;
		} catch (error) {
			throw error;
		}
	}
}
