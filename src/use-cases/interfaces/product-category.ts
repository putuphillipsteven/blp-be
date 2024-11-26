import { Product_Category } from '@prisma/client';
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
	getDetails(args: GetProductDetailsProps): Promise<Product_Category | null>;
	create(args: CreateProductCategoryProps): Promise<Product_Category | undefined>;
	update(args: UpdateProductCategoryProps): Promise<Product_Category | undefined>;
	delete(args: DeleteProductCategoryProps): Promise<Product_Category | undefined>;
}

export interface GetProductDetailsProps {
	id: number;
}

export interface CreateProductCategoryProps extends Product_Category {}

export interface DeleteProductCategoryProps {
	id: number;
}

export interface UpdateProductCategoryProps {
	id: number;
	name: string;
	parent_id?: number | null;
}

export interface GetProductCategoryReturnProps {
	data: Product_Category[];
}
