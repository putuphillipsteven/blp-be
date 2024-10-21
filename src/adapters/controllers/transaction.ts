import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { sendResponse } from '../../utils/utilts';
import {
	GetTransactionFilters,
	ITransactionController,
} from '../../use-cases/interfaces/transaction';
import { TransactionInteractor } from '../../use-cases/interactor/transaction';
import { Transaction } from '../../entities/transaction';
import { RequestWithUserProps } from '../../use-cases/interfaces/auth';

export class TransactionController implements ITransactionController {
	private interactor: TransactionInteractor;
	constructor(interactor: TransactionInteractor) {
		this.interactor = interactor;
	}
	update(req: Request, res: Response, next: NextFunction): Promise<Transaction | undefined> {
		throw new Error('Method not implemented.');
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
			const { user_id }: any = 1;
			console.log('req.user: ', req.user);
			console.log('user_id: ', user_id);
			const result = await this.interactor.create({ ...req.body, user_id });
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
