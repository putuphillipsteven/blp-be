import { Product_Category } from '@prisma/client';
import {
	CreateProductCategoryProps,
	DeleteProductCategoryProps,
	GetProductCategoryReturnProps,
	UpdateProductCategoryProps,
} from './i.product-category';

export interface IProductCategoryInteractor {
	get(): Promise<GetProductCategoryReturnProps | undefined>;
	create(args: CreateProductCategoryProps): Promise<Product_Category | undefined>;
	update(args: UpdateProductCategoryProps): Promise<Product_Category | undefined>;
	delete(args: DeleteProductCategoryProps): Promise<Product_Category | undefined>;
}
