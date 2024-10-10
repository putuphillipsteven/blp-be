import { Product_Category as PrismaProductCategory } from '@prisma/client';

export class ProductCategory implements PrismaProductCategory {
	constructor(
		public id: number,
		public name: string,
		public parent_id: number | null,
		public subcategories?: any,
	) {}
}
