import { PrismaClient, Product_Category } from '@prisma/client';
import {
	GetProductCategoryReturnProps,
	CreateProductCategoryProps,
	UpdateProductCategoryProps,
	DeleteProductCategoryProps,
	ProductCategoryUseCases,
} from '../../use-cases/interfaces/product-category';
import { ProductCategory } from '../../entities/product-category';

export class ProductCategoryRepository implements ProductCategoryUseCases {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	async create(args: CreateProductCategoryProps): Promise<ProductCategory | undefined> {
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

	async update(args: UpdateProductCategoryProps): Promise<Product_Category | undefined> {
		try {
			const { id, name, parent_id } = args;

			const checkChildren = async () => {
				const res = await this.prisma.product_Category.findMany({
					where: {
						parent_id: id,
					},
				});
				if (res) {
					return true;
				} else {
					return false;
				}
			};

			console.log(await checkChildren());
			const toBeUpdated: any = {};
			if (name) toBeUpdated.name = name;
			if (parent_id && parent_id !== null) {
				if (await checkChildren()) {
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
		throw new Error('Method not implemented.');
	}
}
