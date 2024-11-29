import { Product_Category } from '@prisma/client';

export interface ProductCategoryDTO extends Product_Category {
	subcategories?: ProductCategoryDTO[];
}
