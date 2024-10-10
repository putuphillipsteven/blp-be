import { Product_Category } from '@prisma/client';
import {
	CreateProductCategoryProps,
	DeleteProductCategoryProps,
	GetProductCategoryReturnProps,
	UpdateProductCategoryProps,
} from './i.product-category';

export interface IProductCategoryRepository {
	getProductCategory(): Promise<GetProductCategoryReturnProps | undefined>;
	createProductCategory(args: CreateProductCategoryProps): Promise<Product_Category | undefined>;
	updateProductCategory(args: UpdateProductCategoryProps): Promise<Product_Category | undefined>;
	deleteProductCategory(args: DeleteProductCategoryProps): Promise<Product_Category | undefined>;
}
