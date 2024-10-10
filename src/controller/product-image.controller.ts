import { Request, Response, NextFunction } from 'express';
import { IProductImageController } from '../interfaces/product-image/i.product-image.controller';
import { IProductImageInteractor } from '../interfaces/product-image/i.product-image.interactor';
import { sendResponse } from '../utils/utilts';

export class ProductImageController implements IProductImageController {
	private interactor: IProductImageInteractor;
	constructor(interactor: IProductImageInteractor) {
		this.interactor = interactor;
	}
	async onCreateProductImage(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined> {
		try {
			const { product_id } = req.body;
			const imageUrl = req?.file?.filename;
			const data = await this.interactor.create({
				...req.body,
				product_id: Number(product_id),
				image_url: imageUrl,
			});

			return sendResponse(res, 200, 'Create Product Image Success', data);
		} catch (error) {
			next(error);
		}
	}
	onDeleteProductImage(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		throw new Error('Method not implemented.');
	}
}
