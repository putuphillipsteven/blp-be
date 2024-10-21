import { Booking as BookingPrisma } from '@prisma/client';

export class Booking implements BookingPrisma {
	constructor(
		public id: number,
		public customer_id: number,
		public booking_nominal: number,
		public created_at: Date,
		public updated_at: Date | null,
		public deleted_at: Date | null,
		public status_id: number,
	) {}
}
