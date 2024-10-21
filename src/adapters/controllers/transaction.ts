import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { sendResponse } from '../../utils/utilts';
import {
	GetTransactionFilters,
	ITransactionController,
	UpdateTransactionProps,
} from '../../use-cases/interfaces/transaction';
import { TransactionInteractor } from '../../use-cases/interactor/transaction';
import { Transaction } from '../../entities/transaction';
import { RequestWithUserProps } from '../../use-cases/interfaces/auth';

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
			return sendResponse(res, 200, 'Update Transaction Success', result);
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
			const result = await this.interactor.create({ ...req.body, cashier_id: cashierId });
			return sendResponse(res, 200, 'Create Transaction Success', result);
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
			return sendResponse(res, 200, 'Get Transaction Success', result);
		} catch (error) {
			next(error);
		}
	}
}
