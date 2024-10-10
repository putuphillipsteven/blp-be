import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils/utilts';
import { ParsedQs } from 'qs';
import { IProductInteractor } from '../interfaces/product/i.product.interactor';
import {
	DeleteProductProps,
	GetProductFilterProps,
	UpdateProductProps,
} from '../interfaces/product/i.product';
export class ProductController {
	private interactor: IProductInteractor;

	constructor(interactor: IProductInteractor) {
		this.interactor = interactor;
	}

	async onDeleteProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const args: DeleteProductProps = {
				id: Number(id),
			};
			const result = await this.interactor.delete(args);
			sendResponse(res, 200, 'Get Product Success', result);
		} catch (error) {
			next(error);
		}
	}

	async onGetProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const { page, pageSize, product_category_id, product_name, sort, stock } =
				req.query as ParsedQs & GetProductFilterProps;
			const filters: GetProductFilterProps = {
				page,
				pageSize,
				product_category_id,
				product_name,
				sort,
				stock: Number(stock),
			};
			const result = await this.interactor.get(filters);
			sendResponse(res, 200, 'Get Product Success', result);
		} catch (error) {
			next(error);
		}
	}

	async onUpdateProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;

			const updateData: UpdateProductProps = {
				id: Number(id),
				...req.body,
			};

			const result = await this.interactor.update(updateData);
			sendResponse(res, 200, 'Update Product Success', result);
		} catch (error) {
			next(error);
		}
	}

	async onCreateProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await this.interactor.create({
				...req.body,
			});
			return sendResponse(res, 200, 'Create Product Success', data);
		} catch (error) {
			next(error);
		}
	}
}
