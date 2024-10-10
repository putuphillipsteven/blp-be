import { Product as PrismaProduct } from '@prisma/client';

export class Product implements PrismaProduct {
	constructor(
		public id: number,
		public product_name: string,
		public product_category_id: number,
		public product_price: number,
		public product_description: string | null,
	) {}
}
