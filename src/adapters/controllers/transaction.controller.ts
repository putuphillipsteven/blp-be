import { NextFunction, Request, Response } from 'express';
import { ITransactionInteractor } from '../../use-cases/interfaces/transaction/i.transaction.interactor';
import { ParsedQs } from 'qs';
import { sendResponse } from '../../utils/utilts';
import { GetTransactionFilters } from '../../use-cases/interfaces/transaction/i.transaction';
export class TransactionController {
	private interactor: ITransactionInteractor;
	constructor(interactor: ITransactionInteractor) {
		this.interactor = interactor;
	}
	public async onCreateTransaction(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await this.interactor.create(req.body);
			sendResponse(res, 200, 'Create Transaction Success', result);
		} catch (err) {
			next(err);
		}
	}

	async onGetTransactions(req: Request, res: Response, next: NextFunction) {
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
			sendResponse(res, 200, 'Get Transaction Success', result);
		} catch (error) {
			next(error);
		}
	}
}
