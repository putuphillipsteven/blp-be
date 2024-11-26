import { NextFunction, Request, Response } from 'express';
import { Product } from '@prisma/client';

export interface ProductUseCases {
	get(args: GetProductFilterProps): Promise<GetProductReturnProps | undefined>;
	getDetails(args: GetProductDetailsProps): Promise<Product | null>;
	create(args: CreateProductProps): Promise<Product | undefined>;
	update(args: UpdateProductProps): Promise<Product | undefined>;
	delete(args: DeleteProductProps): Promise<Product | undefined>;
}

export interface IProductController {
	delete(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	getDetails(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	get(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	update(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	create(req: CreateProductRequest, res: Response, next: NextFunction): Promise<any | undefined>;
}

export interface CreateProductProps extends Product {}

export interface UpdateProductProps extends CreateProductProps {
	id: number;
}

export interface CreateProductRequest extends Request {}

export interface GetProductFilterProps {
	product_name: string;
	product_category_id: number;
	pageSize: number;
	page: number;
	sort: string;
	stock: number;
}

export interface GetProductDetailsProps {
	id: number;
}

export interface GetProductReturnProps {
	total: number;
	data: Product[];
}

export interface DeleteProductReturnProps {
	message: string;
	data: Product;
}

export interface UpdateProductProps extends CreateProductProps {}

export interface DeleteProductProps {
	id: number;
}
