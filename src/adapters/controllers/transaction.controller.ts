import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import {
	GetTransactionFilters,
	ITransactionController,
	UpdateTransactionProps,
} from '../../use-cases/interfaces/transaction.interface';
import { TransactionInteractor } from '../../use-cases/interactor/transaction.interactor';
import { Transaction } from '@prisma/client';
import { RequestWithUserProps } from '../../use-cases/interfaces/auth.interface';
import {ResponseHandler} from "../../utils/response-handler";

export class TransactionController implements ITransactionController {
	private interactor: TransactionInteractor;
	constructor(interactor: TransactionInteractor) {
		this.interactor = interactor;
	}

	async update(
		req: RequestWithUserProps,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined> {
		try {
			const cashierId = req.user.id;


			const { id } = req.params;

			const updateData: UpdateTransactionProps = {
				id: Number(id),
				cashier_id: cashierId,
				...req.body,
			};

			const result = await this.interactor.update(updateData);

			return ResponseHandler.generateResponse(res, 200, result);
		} catch (error) {
			next(error);
		}
	}

	delete(req: Request, res: Response, next: NextFunction): Promise<Transaction | undefined> {
		throw new Error('Method not implemented.');
	}

	public async create(
		req: RequestWithUserProps,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined> {
		try {
			const cashierId = req.user.id;

			console.log("cashier id: ", req.user.id);
			const result = await this.interactor.create({ ...req.body, cashier_id: cashierId });
			return ResponseHandler.generateResponse(res, 200, result);
		} catch (err) {
			next(err);
		}
	}

	public async get(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { endDate, page, pageSize, startDate, payment_method_id } = req.query as ParsedQs &
				GetTransactionFilters;
			const filters: GetTransactionFilters = {
				startDate,
				endDate,
				page,
				pageSize,
				payment_method_id,
			};
			const result = await this.interactor.get(filters);
			return ResponseHandler.generateResponse(res, 200, result);
		} catch (error) {
			next(error);
		}
	}
}
