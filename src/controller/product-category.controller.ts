import { Request, Response, NextFunction } from 'express';
import { IProductCategoryController } from '../interfaces/product-category/i.product-category.controller';
import { IProductCategoryInteractor } from '../interfaces/product-category/i.product-category.interactor';
import { sendResponse } from '../utils/utilts';

export class ProductCategoryController implements IProductCategoryController {
	private interactor: IProductCategoryInteractor;
	constructor(interactor: IProductCategoryInteractor) {
		this.interactor = interactor;
	}
	async onGetProductCategory(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined> {
		try {
			const data = await this.interactor.get();
			return sendResponse(res, 200, 'Get Product Category Success', data);
		} catch (error) {
			next(error);
		}
	}

	async onCreateProductCategory(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined> {
		try {
			const data = await this.interactor.create({
				...req.body,
			});
			return sendResponse(res, 200, 'Create Product Category Success', data);
		} catch (error) {
			next(error);
		}
	}
}
