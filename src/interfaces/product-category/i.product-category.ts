import { Product_Category } from '@prisma/client';
import { ProductCategory } from '../../entities/product-category';

export interface CreateProductCategoryProps extends ProductCategory {}

export interface DeleteProductCategoryProps {
	id: number;
}

export interface UpdateProductCategoryProps {
	id: number;
	product_category_name: string;
}

export interface GetProductCategoryReturnProps {
	data: any[];
}
