import { Transaction } from '../../entities/transaction';
import {
	CreateTransactionWithDetailsProps,
	GetTransactionFilters,
	GetTransactionReturnProps,
} from './i.transaction';

export interface ITransactionInteractor {
	get(args: GetTransactionFilters): Promise<GetTransactionReturnProps | undefined>;
	create(args: CreateTransactionWithDetailsProps): Promise<Transaction | undefined>;
	update(): Promise<Transaction | undefined>;
	delete(): Promise<Transaction | undefined>;
}
