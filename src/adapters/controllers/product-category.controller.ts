import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/utilts';
import { IProductCategoryController } from '../../use-cases/interfaces/product-category';
import { ProductCategoryInteractor } from '../../use-cases/interactor/product-category.interactor';

export class ProductCategoryController implements IProductCategoryController {
	private interactor: ProductCategoryInteractor;
	constructor(interactor: ProductCategoryInteractor) {
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