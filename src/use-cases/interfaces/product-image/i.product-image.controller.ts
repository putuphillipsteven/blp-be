import { NextFunction, Request, Response } from 'express';

export interface IProductImageController {
	onCreateProductImage(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	onDeleteProductImage(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}
