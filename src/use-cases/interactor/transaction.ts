import { TransactionRepository } from '../../adapters/repositories/transaction';
import { Transaction } from '../../entities/transaction';
import {
	CreateTransactionWithDetailsProps,
	GetTransactionFilters,
	GetTransactionReturnProps,
	TransactionUseCases,
	UpdateTransactionProps,
} from '../interfaces/transaction';

export class TransactionInteractor implements TransactionUseCases {
	private repository: TransactionRepository;
	constructor(repository: TransactionRepository) {
		this.repository = repository;
	}
	async get(args: GetTransactionFilters): Promise<GetTransactionReturnProps | undefined> {
		try {
			const res = await this.repository.get(args);
			return res;
		} catch (error) {
			throw error;
		}
	}

	async create(args: CreateTransactionWithDetailsProps): Promise<Transaction | undefined> {
		try {
			const res = await this.repository.create(args);
			return res;
		} catch (error) {
			throw error;
		}
	}

	async update(args: UpdateTransactionProps): Promise<Transaction | undefined> {
		try {
			const res = await this.repository.update(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	delete(): Promise<Transaction | undefined> {
		throw new Error('Method not implemented.');
	}
}
