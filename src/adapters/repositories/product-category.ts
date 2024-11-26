import { PrismaClient, Product_Category } from '@prisma/client';
import {
	GetProductCategoryReturnProps,
	CreateProductCategoryProps,
	UpdateProductCategoryProps,
	DeleteProductCategoryProps,
	ProductCategoryUseCases,
	GetProductDetailsProps,
} from '../../use-cases/interfaces/product-category';
import {ProductCategoryDTO} from "../../utils/dto/product-category";

export class ProductCategoryRepository implements ProductCategoryUseCases {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	async isChildrenExist(id: number) {
		const children = await this.prisma.product_Category.findMany({
			where: {
				parent_id: id,
			},
		});

		if (children.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	async getDetails(args: GetProductDetailsProps): Promise<any | null> {
		try {
			const res = await this.get();

			const { id } = args;

			return res?.data.find((result) => {
				return result.id === id;
			});
		} catch (error) {
			throw error;
		}
	}

	async create(args: CreateProductCategoryProps): Promise<Product_Category | undefined> {
		try {
			const res = await this.prisma.product_Category.create({ data: args });

			return res;
		} catch (error) {
			throw error;
		}
	}
	async get(): Promise<GetProductCategoryReturnProps | undefined> {
		try {
			const results = await this.prisma.product_Category.findMany({
				include: {
					parent: true,
				},
			});

			const buildNestedCategories = (categories: Product_Category[]): Product_Category[] => {
				const categoryMap: { [key: number]: ProductCategoryDTO } = {};

				// Map each category by id
				categories.forEach((category) => {
					categoryMap[category.id] = { ...category, subcategories: [] };
				});

				// Build the nested structure
				const nestedCategories: Product_Category[] = [];

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

	async update(args: UpdateProductCategoryProps): Promise<Product_Category | undefined> {
		try {
			const { id, name, parent_id } = args;

			const toBeUpdated: any = {};

			if (name) toBeUpdated.name = name;

			if (parent_id && parent_id !== null) {
				if (await this.isChildrenExist(parent_id)) {
					throw new Error('This product category have children, cant change the parent_id');
				}
				toBeUpdated.parent_id = parent_id;
			}

			const res = await this.prisma.product_Category.update({
				where: {
					id,
				},
				data: toBeUpdated,
			});
			return res;
		} catch (error) {
			throw error;
		}
	}

	async delete(args: DeleteProductCategoryProps): Promise<Product_Category | undefined> {
		try {
			const { id } = args;

			if (await this.isChildrenExist(id)) {
				throw new Error('This Product Category has Children, cant delete');
			}

			const res = await this.prisma.product_Category.delete({
				where: {
					id,
				},
			});

			return res;
		} catch (error) {
			throw error;
		}
	}
}
