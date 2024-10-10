import { PrismaClient, Product_Category } from '@prisma/client';
import {
	GetProductCategoryReturnProps,
	CreateProductCategoryProps,
	UpdateProductCategoryProps,
	DeleteProductCategoryProps,
} from '../interfaces/product-category/i.product-category';
import { IProductCategoryRepository } from '../interfaces/product-category/i.product-category.repository';
import { ProductCategory } from '../entities/product-category';

export class ProductCategoryRepository implements IProductCategoryRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	async createProductCategory(
		args: CreateProductCategoryProps,
	): Promise<ProductCategory | undefined> {
		try {
			const res = await this.prisma.product_Category.create({ data: args });
			return res;
		} catch (error) {
			throw error;
		}
	}
	async getProductCategory(): Promise<GetProductCategoryReturnProps | undefined> {
		try {
			const results = await this.prisma.product_Category.findMany({
				include: {
					parent: true,
				},
			});

			const buildNestedCategories = (categories: ProductCategory[]): ProductCategory[] => {
				const categoryMap: { [key: number]: ProductCategory } = {};

				// Map each category by id
				categories.forEach((category) => {
					categoryMap[category.id] = { ...category, subcategories: [] };
				});

				// Build the nested structure
				const nestedCategories: ProductCategory[] = [];

				categories.forEach((category) => {
					if (category.parent_id === null) {
						nestedCategories.push(categoryMap[category.id]);
					} else {
						const parent = categoryMap[category.parent_id];
						if (parent) {
							parent.subcategories!.push(categoryMap[category.id]);
						}
					}
				});

				return nestedCategories;
			};

			const result = buildNestedCategories(results);

			return {
				data: result,
			};
		} catch (error) {
			throw error;
		}
	}

	async updateProductCategory(
		args: UpdateProductCategoryProps,
	): Promise<Product_Category | undefined> {
		throw new Error('Method not implemented.');
	}
	async deleteProductCategory(
		args: DeleteProductCategoryProps,
	): Promise<Product_Category | undefined> {
		throw new Error('Method not implemented.');
	}
}
