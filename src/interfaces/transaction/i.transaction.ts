import { Transaction } from '../../entities/transaction';

export interface TransactionDetailsProps {
	transaction_id: number;
	product_id: number;
	qty: number;
	total_price: number;
	cart_id?: number;
}

export interface GetTransactionReturnProps {
	total: number;
	data: Transaction[];
}

export interface TransactionProps {
	user_id: number;
	total_price: number;
	total_qty: number;
	payment_method_id: number;
	payment_amount: number;
	customer_name: string;
	payment_change: number;
	total_price_ppn: number;
}

export interface CreateTransactionWithDetailsProps extends TransactionProps {
	details: TransactionDetailsProps[];
}

export interface GetTransactionFilters {
	startDate: string;
	endDate: string;
	page: string;
	pageSize: string;
	payment_method_id: number;
}
