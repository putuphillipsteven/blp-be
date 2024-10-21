import { Transaction as PrismaTransaction } from '@prisma/client';

export class Transaction implements PrismaTransaction {
	constructor(
		public id: number,
		public cashier_id: number,
		public user_id: number,
		public total_price: number,
		public total_qty: number,
		public payment_method_id: number,
		public payment_amount: number,
		public customer_name: string | null,
		public payment_change: number | null,
		public total_price_ppn: number | null,
		public created_at: Date,
		public updated_at: Date | null,
		public deleted_at: Date | null,
		public booking_id: number | null,
		public status_id: number,
		public google_drive_link: string,
	) {}
}
