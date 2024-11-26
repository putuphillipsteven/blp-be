import { NextFunction, Request, Response } from 'express';
import {Product_Image} from "@prisma/client";

export interface IProductImageController {
	onCreateProductImage(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	onDeleteProductImage(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}

export interface ProductImageUseCases {
	create(args: CreateProductImageProps): Promise<Product_Image | undefined>;
	delete(args: DeleteProductImageProps): Promise<Product_Image| undefined>;
}

export interface CreateProductImageProps extends Product_Image {}

export interface DeleteProductImageProps {
	id: number;
	product_id: number;
}
