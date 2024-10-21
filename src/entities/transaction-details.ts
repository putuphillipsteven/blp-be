import { Transaction_Detail as TransactionDetailPrisma } from '@prisma/client';

export class TransactionDetail implements TransactionDetailPrisma {
	constructor(
		public id: number,
		public transaction_id: number,
		public product_id: number,
		public qty: number,
		public total_price: number | null,
		public cart_id: number | null,
	) {}
}
