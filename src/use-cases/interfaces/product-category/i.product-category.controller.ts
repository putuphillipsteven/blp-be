import { NextFunction, Request, Response } from 'express';

export interface IProductCategoryController {
	onGetProductCategory(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	onCreateProductCategory(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined>;
}
