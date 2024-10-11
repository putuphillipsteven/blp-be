import { Transaction } from '../../../entities/transaction';
import {
	CreateTransactionWithDetailsProps,
	GetTransactionFilters,
	GetTransactionReturnProps,
} from './i.transaction';

export interface ITransactionRepository {
	getTransactions(args: GetTransactionFilters): Promise<GetTransactionReturnProps | undefined>;
	createTransaction(args: CreateTransactionWithDetailsProps): Promise<Transaction | undefined>;
	updateTransaction(): Promise<Transaction | undefined>;
	deleteTransaction(): Promise<Transaction | undefined>;
}
