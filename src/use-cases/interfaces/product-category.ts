import { ProductCategory } from '../../entities/product-category';
import { NextFunction, Request, Response } from 'express';

export interface IProductCategoryController {
	onGetProductCategory(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	onCreateProductCategory(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined>;
}

export interface ProductCategoryUseCases {
	get(): Promise<GetProductCategoryReturnProps | undefined>;
	create(args: CreateProductCategoryProps): Promise<ProductCategory | undefined>;
	update(args: UpdateProductCategoryProps): Promise<ProductCategory | undefined>;
	delete(args: DeleteProductCategoryProps): Promise<ProductCategory | undefined>;
}

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
