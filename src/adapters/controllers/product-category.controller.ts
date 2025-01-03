import { Request, Response, NextFunction } from 'express';
import { IProductCategoryController } from '../../use-cases/interfaces/product-category.interface';
import { ProductCategoryInteractor } from '../../use-cases/interactor/product-category.interactor';
import {ResponseHandler} from "../../utils/response-handler";

export class ProductCategoryController implements IProductCategoryController {
	private interactor: ProductCategoryInteractor;
	constructor(interactor: ProductCategoryInteractor) {
		this.interactor = interactor;
	}
	async getDetails(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;
			const args = { id: Number(id) };
			const data = await this.interactor.getDetails(args);
			return ResponseHandler.generateResponse(res, 200, data);
		} catch (error) {
			throw error;
		}
	}
	async delete(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;
			const args = { id: Number(id) };
			const data = await this.interactor.delete(args);
			return ResponseHandler.generateResponse(res, 200, data);
		} catch (error) {
			next(error);
		}
	}
	async update(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;

			const { name, parent_id } = req.body;

			const argsToUpdate: any = { id: Number(id), name, parent_id: Number(parent_id) };

			const data = await this.interactor.update(argsToUpdate);
			return ResponseHandler.generateResponse(res, 200, data);
		} catch (error) {
			next(error);
		}
	}
	async get(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const data = await this.interactor.get();
			return ResponseHandler.generateResponse(res, 200, data);
		} catch (error) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const data = await this.interactor.create({
				...req.body,
			});
			return ResponseHandler.generateResponse(res, 200, data);
		} catch (error) {
			next(error);
		}
	}
}
