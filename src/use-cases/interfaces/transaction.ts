import { NextFunction, Request, Response } from 'express';
import { Transaction } from '../../entities/transaction';
import { TransactionDetail } from '../../entities/transaction-details';

export interface GetTransactionReturnProps {
	total: number;
	data: Transaction[];
}

export interface GetTransactionFilters {
	startDate: string;
	endDate: string;
	page: string;
	pageSize: string;
	payment_method_id: number;
}

export interface TransactionUseCases {
	get(args: GetTransactionFilters): Promise<GetTransactionReturnProps | undefined>;
	create(args: CreateTransactionWithDetailsProps): Promise<Transaction | undefined>;
	update(): Promise<Transaction | undefined>;
	delete(): Promise<Transaction | undefined>;
}

export interface ITransactionController {
	get(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<GetTransactionReturnProps | undefined>;
	create(req: Request, res: Response, next: NextFunction): Promise<Transaction | undefined>;
	update(req: Request, res: Response, next: NextFunction): Promise<Transaction | undefined>;
	delete(req: Request, res: Response, next: NextFunction): Promise<Transaction | undefined>;
}

export interface CreateTransactionWithDetailsProps extends Transaction {
	details: TransactionDetail[];
}
