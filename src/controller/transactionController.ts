import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { TransactionService } from '../service/transactionService';
import { sendResponse } from '../utils/utilts';
import { GetTransactionFilters } from '../query/transactionQuery';

export class TransactionController {
	private transactionService: TransactionService;

	constructor() {
		this.transactionService = new TransactionService();
		this.createTransaction = this.createTransaction.bind(this);
		this.getTransaction = this.getTransaction.bind(this);
	}

	public async createTransaction(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await this.transactionService.createTransaction(req.body);
			sendResponse(res, 200, 'Create Transaction Success', result);
		} catch (err) {
			console.error(err);
			next(err);
		}
	}

	public async getTransaction(req: Request, res: Response, next: NextFunction) {
		try {
			const { endDate, page, pageSize, startDate } = req.query as ParsedQs & GetTransactionFilters;
			const filters: GetTransactionFilters = {
				startDate,
				endDate,
				page,
				pageSize,
			};
			const result = await this.transactionService.getTransaction(filters);
			sendResponse(res, 200, 'Get Transaction Success', result);
		} catch (err) {
			next(err);
		}
	}
}
