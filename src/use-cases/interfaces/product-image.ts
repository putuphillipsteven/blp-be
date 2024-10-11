import { ProductImage } from '../../entities/product-image';
import { NextFunction, Request, Response } from 'express';

export interface IProductImageController {
	onCreateProductImage(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	onDeleteProductImage(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}

export interface ProductImageUseCases {
	create(args: CreateProductImageProps): Promise<ProductImage | undefined>;
	delete(args: DeleteProductImageProps): Promise<ProductImage | undefined>;
}

export interface CreateProductImageProps extends ProductImage {}

export interface DeleteProductImageProps {
	id: number;
	product_id: number;
}
