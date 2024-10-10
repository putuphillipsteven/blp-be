import { Product_Image as PrismaProductImage } from '@prisma/client';

export class ProductImage implements PrismaProductImage {
	constructor(
		public id: number,
		public image_url: string,
		public product_id: number,
	) {}
}
