import { PrismaClient } from '@prisma/client';

export interface TransactionDetailsProps {
	transaction_id: number;
	product_id: number;
	qty: number;
	total_price: number;
	cart_id?: number;
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

export interface GetTransactionFilters {
	startDate: string;
	endDate: string;
	page: string;
	pageSize: string;
}

export class TransactionQuery {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	public async createTransaction(transaction: TransactionProps) {
		try {
			const res = await this.prisma.transaction.create({
				data: {
					...transaction,
				},
			});
			return res;
		} catch (err) {
			throw err;
		}
	}

	public async getTransactions(filters: GetTransactionFilters) {
		const skip = (Number(filters.page) - 1) * +filters.pageSize;
		const take = Number(filters.pageSize);

		const today = new Date();
		const defaultStartDate = new Date(today);
		const defaultEndDate = new Date(today);
		defaultEndDate.setDate(today.getDate() + 1);

		const newFilter = {
			skip,
			take,
			where: {
				date: {
					gt: defaultStartDate,
					lt: defaultEndDate,
				},
			},
		};

		const totalFilter = {
			where: {
				date: {
					gt: new Date(0),
					lt: defaultEndDate,
				},
			},
		};

		if (filters.startDate) {
			newFilter.where.date.gt = new Date(filters.startDate);
			totalFilter.where.date.gt = new Date(filters.startDate);
		}
		if (filters.endDate) {
			newFilter.where.date.lt = new Date(filters.endDate);
			totalFilter.where.date.lt = new Date(filters.endDate);
		}

		const total = await this.prisma.transaction.count({ ...totalFilter });
		const data = await this.prisma.transaction.findMany({
			...newFilter,
			include: {
				user: true,
				payment_method: true,
				transaction_detail: true,
			},
		});

		return {
			total,
			data,
		};
	}
}
