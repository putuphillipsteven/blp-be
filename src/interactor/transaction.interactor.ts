import { Transaction } from '../entities/transaction';
import {
	CreateTransactionWithDetailsProps,
	GetTransactionFilters,
	GetTransactionReturnProps,
} from '../interfaces/transaction/i.transaction';
import { ITransactionInteractor } from '../interfaces/transaction/i.transaction.interactor';

import { ITransactionRepository } from '../interfaces/transaction/i.transaction.repository';

export class TransactionInteractor implements ITransactionInteractor {
	private repository: ITransactionRepository;
	constructor(repository: ITransactionRepository) {
		this.repository = repository;
	}
	async get(args: GetTransactionFilters): Promise<GetTransactionReturnProps | undefined> {
		try {
			const res = await this.repository.getTransactions(args);
			return res;
		} catch (error) {
			throw error;
		}
	}

	async create(args: CreateTransactionWithDetailsProps): Promise<Transaction | undefined> {
		try {
			const res = await this.repository.createTransaction(args);
			return res;
		} catch (error) {
			throw error;
		}
	}

	update(): Promise<Transaction | undefined> {
		throw new Error('Method not implemented.');
	}
	delete(): Promise<Transaction | undefined> {
		throw new Error('Method not implemented.');
	}
}
