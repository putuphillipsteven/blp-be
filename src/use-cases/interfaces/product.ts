import { NextFunction, Request, Response } from 'express';
import { Product } from '../../entities/product';

export interface ProductUseCases {
	get(args: GetProductFilterProps): Promise<GetProductReturnProps | undefined>;
	create(args: CreateProductProps): Promise<Product | undefined>;
	update(args: UpdateProductProps): Promise<Product | undefined>;
	delete(args: DeleteProductProps): Promise<Product | undefined>;
}

export interface IProductController {
	onDeleteProduct(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	onGetProduct(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	onUpdateProduct(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	onCreateProduct(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}

export interface CreateProductProps extends Product {}

export interface UpdateProductProps extends CreateProductProps {
	id: number;
}

export interface GetProductFilterProps {
	product_name: string;
	product_category_id: number;
	pageSize: number;
	page: number;
	sort: string;
	stock: number;
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
