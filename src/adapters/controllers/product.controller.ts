import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import {
	CreateProductRequest,
	DeleteProductProps,
	GetProductFilterProps,
	IProductController,
	UpdateProductProps,
} from '../../use-cases/interfaces/product.interface';
import { ProductInteractor } from '../../use-cases/interactor/product.interactor';
import {ResponseHandler} from "../../utils/response-handler";

export class ProductController implements IProductController {
	private interactor: ProductInteractor;

	constructor(interactor: ProductInteractor) {
		this.interactor = interactor;
	}

	async getDetails(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;
			const args = { id: Number(id) };
			const product = await this.interactor.getDetails(args);
			return ResponseHandler.generateResponse(res, 200 , product);
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const args: DeleteProductProps = {
				id: Number(id),
			};
			const result = await this.interactor.delete(args);
			return ResponseHandler.generateResponse(res, 200, result);
		} catch (error) {
			next(error);
		}
	}

	async get(req: Request, res: Response, next: NextFunction) {
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
			return ResponseHandler.generateResponse(res, 200, result);
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;

			const updateData: UpdateProductProps = {
				id: Number(id),
				...req.body,
			};

			const result = await this.interactor.update(updateData);
			ResponseHandler.generateResponse(res, 200, result);
		} catch (error) {
			next(error);
		}
	}

	async create(req: CreateProductRequest, res: Response, next: NextFunction) {
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
