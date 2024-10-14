import { ProductCategory } from '../../entities/product-category';
import { NextFunction, Request, Response } from 'express';

export interface IProductCategoryController {
	get(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	getDetails(req: Request, res: Response, next: NextFunction): Promise<any | null>;
	create(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	update(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	delete(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}

export interface ProductCategoryUseCases {
	get(): Promise<GetProductCategoryReturnProps | undefined>;
	getDetails(args: GetProductDetailsProps): Promise<ProductCategory | null>;
	create(args: CreateProductCategoryProps): Promise<ProductCategory | undefined>;
	update(args: UpdateProductCategoryProps): Promise<ProductCategory | undefined>;
	delete(args: DeleteProductCategoryProps): Promise<ProductCategory | undefined>;
}

export interface GetProductDetailsProps {
	id: number;
}

export interface CreateProductCategoryProps extends ProductCategory {}

export interface DeleteProductCategoryProps {
	id: number;
}

export interface UpdateProductCategoryProps {
	id: number;
	name: string;
	parent_id?: number | null;
}

export interface GetProductCategoryReturnProps {
	data: any[];
}
